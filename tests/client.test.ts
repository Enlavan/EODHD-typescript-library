import { describe, expect, it, vi } from "vitest";
import { EODHDClient, EODHDHttpError } from "../src/index.js";

const jsonResponse = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init
  });

const textResponse = (body: string, init: ResponseInit = {}) =>
  new Response(body, {
    status: 200,
    headers: { "content-type": "text/plain" },
    ...init
  });

describe("EODHDClient", () => {
  it("builds urls with api_token, path params, and query params", async () => {
    const fetchMock = vi.fn(async (url: string) => jsonResponse({ ok: true }));
    const client = new EODHDClient({
      apiKey: "test-token",
      baseUrl: "https://example.com/api",
      fetch: fetchMock
    });

    await client.getEod("AAPL.US", { from: "2025-01-01" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    const parsed = new URL(calledUrl);

    expect(parsed.origin + parsed.pathname).toBe("https://example.com/api/eod/AAPL.US");
    expect(parsed.searchParams.get("api_token")).toBe("test-token");
    expect(parsed.searchParams.get("from")).toBe("2025-01-01");
  });

  it("returns text when fmt=csv", async () => {
    const fetchMock = vi.fn(async () => textResponse("a,b,c"));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    const result = await client.getEod("AAPL.US", { fmt: "csv" });

    expect(result).toBe("a,b,c");
  });

  it("throws EODHDHttpError on non-OK responses", async () => {
    const fetchMock = vi.fn(async () =>
      new Response("Bad Request", { status: 400, statusText: "Bad Request" })
    );
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await expect(client.getEod("AAPL.US")).rejects.toBeInstanceOf(EODHDHttpError);
  });

  it("uses auxiliary base url for news word weights and supports arrayBuffer", async () => {
    const buffer = new Uint8Array([1, 2, 3]).buffer;
    const fetchMock = vi.fn(async (url: string) => {
      if (url.startsWith("https://eodhistoricaldata.com/api/news-word-weights")) {
        return jsonResponse({ data: [] });
      }
      return new Response(buffer, { status: 200 });
    });

    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.getNewsWordWeights({ s: "AAPL.US", limit: 5 });
    const logo = await client.getLogo("AAPL.US");

    expect(logo.byteLength).toBe(3);
    const callUrls = fetchMock.mock.calls.map((call) => call[0]);
    expect(callUrls.some((url) => String(url).includes("eodhistoricaldata.com/api/news-word-weights"))).toBe(true);
  });
});
