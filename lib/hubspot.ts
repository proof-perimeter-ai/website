const HUBSPOT_API_BASE = "https://api.hubapi.com";

export class HubspotError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "HubspotError";
    this.code = code;
    this.status = status;
  }
}

export type UpsertContactInput = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UpsertContactResult = {
  contactId: string;
  operation: "created" | "updated";
};

function getAccessToken(): string {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    throw new HubspotError(
      "HUBSPOT_ACCESS_TOKEN is not configured",
      "HUBSPOT_NOT_CONFIGURED",
      500,
    );
  }
  return token;
}

async function hubspotFetch(path: string, init: RequestInit): Promise<unknown> {
  const response = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      (body && typeof body === "object" && "message" in body && String(body.message)) ||
      `HubSpot request failed with status ${response.status}`;
    throw new HubspotError(message, "HUBSPOT_REQUEST_FAILED", response.status);
  }

  return response.json();
}

async function searchContactByEmail(email: string): Promise<{ id: string } | null> {
  const result = (await hubspotFetch("/crm/v3/objects/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [{ propertyName: "email", operator: "EQ", value: email }],
        },
      ],
      properties: ["email"],
      limit: 1,
    }),
  })) as { results?: { id: string }[] };

  return result.results?.[0] ?? null;
}

function buildProperties(input: UpsertContactInput, includeEmail: boolean) {
  const properties: Record<string, string> = {
    firstname: input.firstName,
    lastname: input.lastName,
  };
  if (includeEmail) {
    properties.email = input.email;
  }
  return properties;
}

async function createContact(input: UpsertContactInput): Promise<{ id: string }> {
  return (await hubspotFetch("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties: buildProperties(input, true) }),
  })) as { id: string };
}

async function updateContact(contactId: string, input: UpsertContactInput): Promise<{ id: string }> {
  return (await hubspotFetch(`/crm/v3/objects/contacts/${contactId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: buildProperties(input, false) }),
  })) as { id: string };
}

export async function upsertContact(input: UpsertContactInput): Promise<UpsertContactResult> {
  const existing = await searchContactByEmail(input.email);

  if (existing) {
    const updated = await updateContact(existing.id, input);
    return { contactId: updated.id, operation: "updated" };
  }

  const created = await createContact(input);
  return { contactId: created.id, operation: "created" };
}
