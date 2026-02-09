# EODHD TypeScript Adapter

A minimal, strongly-typed TypeScript client for the EODHD APIs. This adapter wraps the most common EODHD endpoints, handles authentication, and provides a single `request` method for any custom call.

## Install

```bash
npm install eodhd-typescript-library
```

## Quick start

```ts
import { EODHDClient } from "eodhd-typescript-library";

const client = new EODHDClient({
  apiKey: process.env.EODHD_API_TOKEN ?? "",
  // baseUrl: "https://eodhd.com/api" // default
});

const bars = await client.getEod("AAPL.US", {
  from: "2025-01-01",
  to: "2025-01-31",
  fmt: "json"
});

const quote = await client.getRealTime("AAPL.US", { fmt: "json" });
const fundamentals = await client.getFundamentals("AAPL.US");
```

## Configuration

```ts
const client = new EODHDClient({
  apiKey: "your-token",
  baseUrl: "https://eodhd.com/api",
  timeoutMs: 30000,
  defaultParams: { fmt: "json" },
  userAgent: "my-app/1.0"
});
```

- `apiKey` (required): Your EODHD API token.
- `baseUrl`: Defaults to `https://eodhd.com/api`.
- `timeoutMs`: Request timeout in milliseconds (default 30s).
- `defaultParams`: Query params automatically added to every request.
- `userAgent`: Optional `User-Agent` header.

## Response formats

Many endpoints accept `fmt=csv` or `fmt=xml`. When you pass a non-JSON format, the client automatically returns a `string` instead of JSON. You can override this behavior by calling `request` directly.

```ts
const csv = await client.getEod("AAPL.US", { fmt: "csv" });
```

## Core methods

See `docs/ENDPOINTS.md` for the full list.

```ts
await client.getEod("AAPL.US", { from: "2025-01-01", to: "2025-01-31" });
await client.getIntraday("AAPL.US", { interval: "5m" });
await client.getRealTime("AAPL.US", { s: ["MSFT.US", "NVDA.US"] });
await client.getFundamentals("AAPL.US", { filter: "Highlights,Valuation" });
await client.getNews({ s: "AAPL.US", limit: 10 });
await client.getTechnical("AAPL.US", { function: "rsi", period: 14 });
```

## Generic requests

Use `request` for custom endpoints or parameters.

```ts
const data = await client.request({
  path: "/exchange-details/{exchangeCode}",
  pathParams: { exchangeCode: "US" },
  params: { fmt: "json" }
});
```

## Testing

```bash
npm test
```

## Notes

- `getNewsWordWeights`, `getInsiderTransactions`, and `getLogo` use the auxiliary base URL (`https://eodhistoricaldata.com/api`).
- For endpoints that return binary content (logo PNGs), use `getLogo` which returns an `ArrayBuffer`.
