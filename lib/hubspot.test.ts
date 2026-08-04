import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HubspotError, upsertContact } from "./hubspot";

const originalToken = process.env.HUBSPOT_ACCESS_TOKEN;
const originalWebhookUrl = process.env.LEAD_WEBHOOK_URL;
const originalContactUrlPrefix = process.env.HUBSPOT_CONTACT_URL_PREFIX;

function jsonResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  } as Response;
}

function parseBody(call: unknown[]) {
  const init = call[1] as RequestInit;
  return JSON.parse(init.body as string);
}

describe("upsertContact", () => {
  beforeEach(() => {
    process.env.HUBSPOT_ACCESS_TOKEN = "test-token";
    process.env.LEAD_WEBHOOK_URL = "https://hook.example.com/lead";
    process.env.HUBSPOT_CONTACT_URL_PREFIX =
      "https://app-na2.hubspot.com/contacts/246627877/record/0-1/";
  });

  afterEach(() => {
    process.env.HUBSPOT_ACCESS_TOKEN = originalToken;
    process.env.LEAD_WEBHOOK_URL = originalWebhookUrl;
    process.env.HUBSPOT_CONTACT_URL_PREFIX = originalContactUrlPrefix;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("creates a new contact and sends the lead webhook when no match is found by email", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [] }))
      .mockResolvedValueOnce(jsonResponse({ id: "123" }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "123", operation: "created" });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const [searchUrl] = fetchMock.mock.calls[0];
    expect(searchUrl).toContain("/crm/v3/objects/contacts/search");

    const [createUrl, createInit] = fetchMock.mock.calls[1];
    expect(createUrl).toBe("https://api.hubapi.com/crm/v3/objects/contacts");
    expect(createInit.method).toBe("POST");
    expect(parseBody(fetchMock.mock.calls[1]).properties).toEqual({
      firstname: "Ada",
      lastname: "Lovelace",
      email: "ada@example.com",
    });

    const [webhookUrl, webhookInit] = fetchMock.mock.calls[2];
    expect(webhookUrl).toBe("https://hook.example.com/lead");
    expect(webhookInit.method).toBe("POST");
    expect(parseBody(fetchMock.mock.calls[2])).toEqual({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      hubspot_contact_id: "123",
      hubspot_contact_url: "https://app-na2.hubspot.com/contacts/246627877/record/0-1/123",
      hubspot_operation: "created",
    });
  });

  it("updates the existing contact and sends the lead webhook when a match is found by email", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [{ id: "999" }] }))
      .mockResolvedValueOnce(jsonResponse({ id: "999" }))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "999", operation: "updated" });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const [updateUrl, updateInit] = fetchMock.mock.calls[1];
    expect(updateUrl).toBe("https://api.hubapi.com/crm/v3/objects/contacts/999");
    expect(updateInit.method).toBe("PATCH");
    // Update payload must not overwrite the email used to find the contact.
    expect(parseBody(fetchMock.mock.calls[1]).properties).toEqual({
      firstname: "Ada",
      lastname: "Lovelace",
    });

    expect(parseBody(fetchMock.mock.calls[2])).toEqual({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      hubspot_contact_id: "999",
      hubspot_contact_url: "https://app-na2.hubspot.com/contacts/246627877/record/0-1/999",
      hubspot_operation: "updated",
    });
  });

  it("throws a HubspotError when the access token is not configured", async () => {
    delete process.env.HUBSPOT_ACCESS_TOKEN;
    vi.stubGlobal("fetch", vi.fn());

    await expect(
      upsertContact({ firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" }),
    ).rejects.toMatchObject({ code: "HUBSPOT_NOT_CONFIGURED" });
  });

  it("throws a HubspotError when HubSpot responds with a non-2xx status", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({ message: "Invalid token" }, false, 401));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      upsertContact({ firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" }),
    ).rejects.toThrow(HubspotError);
  });

  it("logs and continues when the lead webhook responds with a non-2xx status", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [] }))
      .mockResolvedValueOnce(jsonResponse({ id: "123" }))
      .mockResolvedValueOnce(jsonResponse({ message: "Webhook failed" }, false, 500));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "123", operation: "created" });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[hubspot] Lead webhook request failed:",
      500,
      "{\"message\":\"Webhook failed\"}",
    );
  });

  it("logs and continues when the lead webhook request throws", async () => {
    const networkError = new Error("network down");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [] }))
      .mockResolvedValueOnce(jsonResponse({ id: "123" }))
      .mockRejectedValueOnce(networkError);
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "123", operation: "created" });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[hubspot] Lead webhook request failed:",
      networkError,
    );
  });

  it("logs and skips the webhook when the webhook env is not configured", async () => {
    delete process.env.LEAD_WEBHOOK_URL;
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [] }))
      .mockResolvedValueOnce(jsonResponse({ id: "123" }));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "123", operation: "created" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[hubspot] LEAD_WEBHOOK_URL is not configured; skipping lead webhook",
    );
  });

  it("logs and skips the webhook when the contact URL prefix env is not configured", async () => {
    delete process.env.HUBSPOT_CONTACT_URL_PREFIX;
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [] }))
      .mockResolvedValueOnce(jsonResponse({ id: "123" }));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "123", operation: "created" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[hubspot] HUBSPOT_CONTACT_URL_PREFIX is not configured; skipping lead webhook",
    );
  });
});
