import { describe, expect, it, vi } from "vitest";
import {
  EODHDClient,
  EODHDHttpError,
  EodHistoricalDataAPI,
  FinancialNewsAPI,
  SentimentDataAPI,
  NewsWordWeightsAPI,
  ExchangesListAPI,
  ExchangeDetailsAPI,
  ExchangeTickersAPI,
  SearchAPI,
  SymbolChangeHistoryAPI,
  UpcomingEarningsAPI,
  EarningsTrendsAPI,
  LogoAPI,
  LogoSvgAPI,
  InsiderTransactionsAPI,
  OptionsContractsAPI,
  UserAPI,
  USTBillRatesAPI,
  TradingHoursListMarketsAPI,
  PraamsSmartScreenerEquityAPI,
  LiveStockPricesAPI,
} from "../src/index.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const jsonResponse = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });

const textResponse = (body: string, init: ResponseInit = {}) =>
  new Response(body, {
    status: 200,
    headers: { "content-type": "text/plain" },
    ...init,
  });

// ---------------------------------------------------------------------------
// EODHDClient – flat API
// ---------------------------------------------------------------------------

describe("EODHDClient – flat convenience methods", () => {
  it("builds urls with api_token, path params, and query params", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true }));
    const client = new EODHDClient({
      apiKey: "test-token",
      baseUrl: "https://example.com/api",
      fetch: fetchMock,
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
      new Response("Bad Request", { status: 400, statusText: "Bad Request" }),
    );
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await expect(client.getEod("AAPL.US")).rejects.toBeInstanceOf(EODHDHttpError);
  });

  it("uses auxiliary base url for news word weights", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ data: [] }));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.getNewsWordWeights({ s: "AAPL.US", limit: 5 });

    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("eodhistoricaldata.com/api/news-word-weights");
  });

  it("returns ArrayBuffer for getLogo", async () => {
    const buffer = new Uint8Array([1, 2, 3]).buffer;
    const fetchMock = vi.fn(async () => new Response(buffer, { status: 200 }));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    const logo = await client.getLogo("AAPL.US");

    expect(logo.byteLength).toBe(3);
    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("eodhistoricaldata.com/api/logo/AAPL.US");
  });

  it("uses auxiliary base url for insider transactions", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.getInsiderTransactions({ code: "AAPL.US" });

    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("eodhistoricaldata.com/api/insider-transactions");
  });

  it("delegates getLogoSvg to logoSvg module", async () => {
    const fetchMock = vi.fn(async () => new Response("<svg></svg>", { status: 200 }));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    const result = await client.getLogoSvg("AAPL.US");
    expect(typeof result).toBe("string");
    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("/logo-svg/AAPL.US");
  });

  it("delegates calendar methods correctly", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ earnings: [] }));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.getUpcomingEarnings();
    expect((fetchMock.mock.calls[0]?.[0] as string)).toContain("/calendar/earnings");

    await client.getUpcomingIpos();
    expect((fetchMock.mock.calls[1]?.[0] as string)).toContain("/calendar/ipos");

    await client.getUpcomingSplits();
    expect((fetchMock.mock.calls[2]?.[0] as string)).toContain("/calendar/splits");
  });

  it("delegates exchange methods correctly", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.getExchangesList();
    expect((fetchMock.mock.calls[0]?.[0] as string)).toContain("/exchanges-list");

    await client.getExchangeDetails("US");
    expect((fetchMock.mock.calls[1]?.[0] as string)).toContain("/exchange-details/US");

    await client.getExchangeTickers("US");
    expect((fetchMock.mock.calls[2]?.[0] as string)).toContain("/exchange-symbol-list/US");

    await client.searchSymbols("Apple");
    expect((fetchMock.mock.calls[3]?.[0] as string)).toContain("/search/Apple");

    await client.getSymbolChangeHistory();
    expect((fetchMock.mock.calls[4]?.[0] as string)).toContain("/symbol-change-history");
  });
});

// ---------------------------------------------------------------------------
// EODHDClient – modular API
// ---------------------------------------------------------------------------

describe("EODHDClient – modular API access", () => {
  it("exposes eodHistoricalData module", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([{ date: "2025-01-01", open: 100, high: 101, low: 99, close: 100.5 }]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    const result = await client.eodHistoricalData.getEod("AAPL.US");

    expect(Array.isArray(result)).toBe(true);
    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("/eod/AAPL.US");
  });

  it("exposes financialNews module", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.financialNews.getFinancialNews({ s: "AAPL.US", limit: 5 });
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/news");
  });

  it("exposes sentimentData module", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.sentimentData.getSentimentData({ s: "AAPL.US" });
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/sentiments");
  });

  it("exposes individual calendar modules", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ earnings: [] }));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.upcomingEarnings.getUpcomingEarnings();
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/calendar/earnings");

    await client.upcomingIpos.getUpcomingIpos();
    expect(fetchMock.mock.calls[1]?.[0]).toContain("/calendar/ipos");

    await client.upcomingSplits.getUpcomingSplits();
    expect(fetchMock.mock.calls[2]?.[0]).toContain("/calendar/splits");
  });

  it("exposes search module", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.search.searchSymbols("Apple");
    const calledUrl = fetchMock.mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("/search/Apple");
  });

  it("exposes optionsContracts module", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.optionsContracts.getOptionsContracts();
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/mp/unicornbay/options/contracts");
  });

  it("exposes user module", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ name: "test" }));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    const user = await client.user.getUser();
    expect(user).toEqual({ name: "test" });
    expect(fetchMock.mock.calls[0]?.[0]).toContain("/user");
  });

  it("exposes all 74 modules as properties", () => {
    const fetchMock = vi.fn(async () => jsonResponse({}));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    // Core market data
    expect(client.eodHistoricalData).toBeInstanceOf(EodHistoricalDataAPI);
    expect(client.intradayData).toBeDefined();
    expect(client.liveStockPrices).toBeDefined();
    expect(client.liveExtendedQuotes).toBeDefined();
    expect(client.tickData).toBeDefined();
    expect(client.technicalIndicator).toBeDefined();
    expect(client.historicalMarketCap).toBeDefined();

    // Fundamentals
    expect(client.fundamentals).toBeDefined();
    expect(client.bulkFundamentals).toBeDefined();

    // Corporate actions
    expect(client.historicalDividends).toBeDefined();
    expect(client.historicalSplits).toBeDefined();
    expect(client.bulkEod).toBeDefined();

    // Calendar
    expect(client.upcomingEarnings).toBeDefined();
    expect(client.upcomingIpos).toBeDefined();
    expect(client.upcomingSplits).toBeDefined();
    expect(client.upcomingDividends).toBeDefined();
    expect(client.earningsTrends).toBeDefined();

    // Exchanges & search
    expect(client.exchangesList).toBeDefined();
    expect(client.exchangeDetails).toBeDefined();
    expect(client.exchangeTickers).toBeDefined();
    expect(client.search).toBeDefined();
    expect(client.symbolChangeHistory).toBeDefined();

    // News & sentiment
    expect(client.financialNews).toBeDefined();
    expect(client.sentimentData).toBeDefined();
    expect(client.newsWordWeights).toBeDefined();

    // Insider transactions
    expect(client.insiderTransactions).toBeDefined();

    // Macro & economic
    expect(client.macroIndicators).toBeDefined();
    expect(client.economicEvents).toBeDefined();

    // Screener
    expect(client.stockScreener).toBeDefined();

    // Options
    expect(client.optionsContracts).toBeDefined();
    expect(client.optionsEod).toBeDefined();
    expect(client.optionsUnderlyings).toBeDefined();

    // Indices
    expect(client.indicesList).toBeDefined();
    expect(client.indexComponents).toBeDefined();

    // CBOE
    expect(client.cboeIndicesList).toBeDefined();
    expect(client.cboeIndexData).toBeDefined();

    // Logos
    expect(client.logo).toBeDefined();
    expect(client.logoSvg).toBeDefined();

    // User
    expect(client.user).toBeDefined();

    // Marketplace
    expect(client.marketplaceTickData).toBeDefined();

    // TradingHours
    expect(client.tradingHoursListMarkets).toBeDefined();
    expect(client.tradingHoursLookupMarkets).toBeDefined();
    expect(client.tradingHoursMarketDetails).toBeDefined();
    expect(client.tradingHoursMarketStatus).toBeDefined();

    // US Treasury
    expect(client.ustBillRates).toBeDefined();
    expect(client.ustLongTermRates).toBeDefined();
    expect(client.ustYieldRates).toBeDefined();
    expect(client.ustRealYieldRates).toBeDefined();

    // Illio
    expect(client.illioBestWorst).toBeDefined();
    expect(client.illioBetaBands).toBeDefined();
    expect(client.illioLargestVolatility).toBeDefined();
    expect(client.illioPerformanceInsights).toBeDefined();
    expect(client.illioPerformanceVsMarket).toBeDefined();
    expect(client.illioRiskInsights).toBeDefined();
    expect(client.illioRiskReturn).toBeDefined();
    expect(client.illioVolatilityBands).toBeDefined();

    // Investverte
    expect(client.investverteListCompanies).toBeDefined();
    expect(client.investverteListCountries).toBeDefined();
    expect(client.investverteListSectors).toBeDefined();
    expect(client.investverteViewCompany).toBeDefined();
    expect(client.investverteViewCountry).toBeDefined();
    expect(client.investverteViewSector).toBeDefined();

    // PRAAMS
    expect(client.praamsBankBalanceSheetByIsin).toBeDefined();
    expect(client.praamsBankBalanceSheetByTicker).toBeDefined();
    expect(client.praamsBankIncomeStatementByIsin).toBeDefined();
    expect(client.praamsBankIncomeStatementByTicker).toBeDefined();
    expect(client.praamsBondAnalyzeByIsin).toBeDefined();
    expect(client.praamsReportBondByIsin).toBeDefined();
    expect(client.praamsReportEquityByIsin).toBeDefined();
    expect(client.praamsReportEquityByTicker).toBeDefined();
    expect(client.praamsRiskScoringByIsin).toBeDefined();
    expect(client.praamsRiskScoringByTicker).toBeDefined();
    expect(client.praamsSmartScreenerBond).toBeDefined();
    expect(client.praamsSmartScreenerEquity).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Standalone API modules
// ---------------------------------------------------------------------------

describe("Standalone API modules", () => {
  it("EodHistoricalDataAPI works with a custom requester", async () => {
    const requester = vi.fn(async () => [{ date: "2025-01-01", open: 1, high: 2, low: 0.5, close: 1.5 }]);
    const api = new EodHistoricalDataAPI(requester);

    const result = await api.getEod("AAPL.US", { from: "2025-01-01" });

    expect(requester).toHaveBeenCalledTimes(1);
    expect(requester).toHaveBeenCalledWith({
      path: "/eod/{ticker}",
      pathParams: { ticker: "AAPL.US" },
      params: { from: "2025-01-01" },
    });
    expect(result).toEqual([{ date: "2025-01-01", open: 1, high: 2, low: 0.5, close: 1.5 }]);
  });

  it("FinancialNewsAPI passes correct path", async () => {
    const requester = vi.fn(async () => []);
    const api = new FinancialNewsAPI(requester);

    await api.getFinancialNews({ s: "AAPL.US" });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({ path: "/news" });
  });

  it("SentimentDataAPI passes correct path", async () => {
    const requester = vi.fn(async () => []);
    const api = new SentimentDataAPI(requester);

    await api.getSentimentData({ s: "AAPL.US" });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({ path: "/sentiments" });
  });

  it("NewsWordWeightsAPI uses aux base URL", async () => {
    const requester = vi.fn(async () => []);
    const api = new NewsWordWeightsAPI(requester);

    await api.getNewsWordWeights({ s: "AAPL.US" });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/news-word-weights",
      baseUrl: "https://eodhistoricaldata.com/api",
    });
  });

  it("ExchangesListAPI calls /exchanges-list", async () => {
    const requester = vi.fn(async () => []);
    const api = new ExchangesListAPI(requester);

    await api.getExchangesList();
    expect(requester.mock.calls[0]?.[0]).toMatchObject({ path: "/exchanges-list" });
  });

  it("ExchangeDetailsAPI calls /exchange-details/{exchangeCode}", async () => {
    const requester = vi.fn(async () => ({}));
    const api = new ExchangeDetailsAPI(requester);

    await api.getExchangeDetails("US");
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/exchange-details/{exchangeCode}",
      pathParams: { exchangeCode: "US" },
    });
  });

  it("ExchangeTickersAPI calls /exchange-symbol-list/{exchangeCode}", async () => {
    const requester = vi.fn(async () => []);
    const api = new ExchangeTickersAPI(requester);

    await api.getExchangeTickers("US");
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/exchange-symbol-list/{exchangeCode}",
      pathParams: { exchangeCode: "US" },
    });
  });

  it("SearchAPI calls /search/{query}", async () => {
    const requester = vi.fn(async () => []);
    const api = new SearchAPI(requester);

    await api.searchSymbols("AAPL");
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/search/{query}",
      pathParams: { query: "AAPL" },
    });
  });

  it("SymbolChangeHistoryAPI calls /symbol-change-history", async () => {
    const requester = vi.fn(async () => []);
    const api = new SymbolChangeHistoryAPI(requester);

    await api.getSymbolChangeHistory();
    expect(requester.mock.calls[0]?.[0]).toMatchObject({ path: "/symbol-change-history" });
  });

  it("LogoAPI uses aux base URL and arrayBuffer response type", async () => {
    const requester = vi.fn(async () => new ArrayBuffer(3));
    const api = new LogoAPI(requester);

    await api.getLogo("AAPL.US");
    expect(requester).toHaveBeenCalledWith({
      baseUrl: "https://eodhistoricaldata.com/api",
      path: "/logo/{symbol}",
      pathParams: { symbol: "AAPL.US" },
      responseType: "arrayBuffer",
    });
  });

  it("LogoSvgAPI returns text", async () => {
    const requester = vi.fn(async () => "<svg></svg>");
    const api = new LogoSvgAPI(requester);

    await api.getLogoSvg("AAPL.US");
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/logo-svg/{symbol}",
      responseType: "text",
    });
  });

  it("UpcomingEarningsAPI calls /calendar/earnings", async () => {
    const requester = vi.fn(async () => ({}));
    const api = new UpcomingEarningsAPI(requester);

    await api.getUpcomingEarnings({ from: "2025-01-01" });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/calendar/earnings",
      params: { from: "2025-01-01" },
    });
  });

  it("EarningsTrendsAPI calls /calendar/trends", async () => {
    const requester = vi.fn(async () => ({}));
    const api = new EarningsTrendsAPI(requester);

    await api.getEarningsTrends({ symbols: "AAPL.US" });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/calendar/trends",
      params: { symbols: "AAPL.US" },
    });
  });

  it("InsiderTransactionsAPI uses aux base URL", async () => {
    const requester = vi.fn(async () => []);
    const api = new InsiderTransactionsAPI(requester);

    await api.getInsiderTransactions({ code: "AAPL.US" });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/insider-transactions",
      baseUrl: "https://eodhistoricaldata.com/api",
    });
  });

  it("OptionsContractsAPI calls marketplace path", async () => {
    const requester = vi.fn(async () => []);
    const api = new OptionsContractsAPI(requester);

    await api.getOptionsContracts();
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/mp/unicornbay/options/contracts",
    });
  });

  it("UserAPI calls /user", async () => {
    const requester = vi.fn(async () => ({ name: "test" }));
    const api = new UserAPI(requester);

    const user = await api.getUser();
    expect(user).toEqual({ name: "test" });
  });

  it("USTBillRatesAPI calls marketplace path", async () => {
    const requester = vi.fn(async () => ({ meta: { total: 0 }, data: [] }));
    const api = new USTBillRatesAPI(requester);

    await api.getUSTBillRates({ "filter[year]": 2025 });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/mp/unicornbay/ust/bill",
    });
  });

  it("TradingHoursListMarketsAPI calls marketplace path", async () => {
    const requester = vi.fn(async () => []);
    const api = new TradingHoursListMarketsAPI(requester);

    await api.getTradingHoursListMarkets();
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/mp/tradinghours/markets",
    });
  });

  it("PraamsSmartScreenerEquityAPI sends POST with body", async () => {
    const requester = vi.fn(async () => ({ success: true, message: "", errors: [], item: { peers: [], totalCount: 0 } }));
    const api = new PraamsSmartScreenerEquityAPI(requester);

    await api.getPraamsSmartScreenerEquity({ mainRatioMin: 0, mainRatioMax: 100 });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      method: "POST",
      path: "/mp/praams/explore/equity",
      body: { mainRatioMin: 0, mainRatioMax: 100 },
    });
  });

  it("LiveStockPricesAPI calls /real-time/{ticker}", async () => {
    const requester = vi.fn(async () => ({ code: "AAPL.US", timestamp: 0 }));
    const api = new LiveStockPricesAPI(requester);

    await api.getLiveStockPrices("AAPL.US", { s: ["MSFT.US"] });
    expect(requester.mock.calls[0]?.[0]).toMatchObject({
      path: "/real-time/{ticker}",
      pathParams: { ticker: "AAPL.US" },
      params: { s: ["MSFT.US"] },
    });
  });
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

describe("Error handling", () => {
  it("throws EODHDConfigError when apiKey is missing", () => {
    expect(() => new EODHDClient({ apiKey: "" })).toThrow("apiKey is required");
  });

  it("EODHDHttpError contains status, url, and body", async () => {
    const fetchMock = vi.fn(async () =>
      new Response('{"error":"Forbidden"}', { status: 403, statusText: "Forbidden" }),
    );
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    try {
      await client.getEod("AAPL.US");
      expect.fail("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(EODHDHttpError);
      const httpError = error as InstanceType<typeof EODHDHttpError>;
      expect(httpError.status).toBe(403);
      expect(httpError.statusText).toBe("Forbidden");
      expect(httpError.body).toBe('{"error":"Forbidden"}');
    }
  });
});

// ---------------------------------------------------------------------------
// Default params & user agent
// ---------------------------------------------------------------------------

describe("Client configuration", () => {
  it("merges defaultParams into every request", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({
      apiKey: "test-token",
      fetch: fetchMock,
      defaultParams: { fmt: "json" },
    });

    await client.getEod("AAPL.US");

    const calledUrl = new URL(fetchMock.mock.calls[0]?.[0] as string);
    expect(calledUrl.searchParams.get("fmt")).toBe("json");
  });

  it("sends User-Agent header when configured", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({
      apiKey: "test-token",
      fetch: fetchMock,
      userAgent: "my-app/1.0",
    });

    await client.getEod("AAPL.US");

    const options = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect((options.headers as Record<string, string>)["User-Agent"]).toBe("my-app/1.0");
  });

  it("handles array query parameters by joining with commas", async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    const client = new EODHDClient({ apiKey: "test-token", fetch: fetchMock });

    await client.getLiveStockPrices("AAPL.US", { s: ["MSFT.US", "NVDA.US"] });

    const calledUrl = new URL(fetchMock.mock.calls[0]?.[0] as string);
    expect(calledUrl.searchParams.get("s")).toBe("MSFT.US,NVDA.US");
  });
});
