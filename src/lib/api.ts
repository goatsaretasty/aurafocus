const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export type Entry = {
  id: number;
  song: string;
  musings: string;
  created_at: string;
};

async function request<T>(
  path: string,
  token: string | null,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export function createEntry(
  token: string | null,
  song: string,
  musings: string
) {
  return request<Entry>("/api/entries", token, {
    method: "POST",
    body: JSON.stringify({ song, musings }),
  });
}

export function listEntries(token: string | null) {
  return request<Entry[]>("/api/entries", token);
}
