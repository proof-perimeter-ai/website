import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HubspotError, upsertContact } from "./hubspot";

const originalToken = process.env.HUBSPOT_ACCESS_TOKEN;

function jsonResponse(body: unknown, ok = true, status = 200) {
  return { ok, status, json: async () => body } as Response;
}

function parseBody(call: unknown[]) {
  const init = call[1] as RequestInit;
  return JSON.parse(init.body as string);
}

describe("upsertContact", () => {
  beforeEach(() => {
    process.env.HUBSPOT_ACCESS_TOKEN = "test-token";
  });

  afterEach(() => {
    process.env.HUBSPOT_ACCESS_TOKEN = originalToken;
    vi.unstubAllGlobals();
  });

  it("creates a new contact when no match is found by email", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [] }))
      .mockResolvedValueOnce(jsonResponse({ id: "123" }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "123", operation: "created" });
    expect(fetchMock).toHaveBeenCalledTimes(2);

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
  });

  it("updates the existing contact when a match is found by email", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ results: [{ id: "999" }] }))
      .mockResolvedValueOnce(jsonResponse({ id: "999" }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await upsertContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });

    expect(result).toEqual({ contactId: "999", operation: "updated" });

    const [updateUrl, updateInit] = fetchMock.mock.calls[1];
    expect(updateUrl).toBe("https://api.hubapi.com/crm/v3/objects/contacts/999");
    expect(updateInit.method).toBe("PATCH");
    // Update payload must not overwrite the email used to find the contact.
    expect(parseBody(fetchMock.mock.calls[1]).properties).toEqual({
      firstname: "Ada",
      lastname: "Lovelace",
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
});
