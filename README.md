# EODHD TypeScript Library

A strongly-typed, modular TypeScript client for the [EODHD](https://eodhd.com) financial data APIs. Covers 74 endpoints across equities, ETFs, indices, forex, crypto, bonds, options, and more on 70+ global exchanges.

## Features

- **One module per API** – 74 standalone modules, one for each EODHD endpoint
- **Fully typed** – every request and response has a dedicated TypeScript interface
- **Zero runtime dependencies** – uses the native Fetch API (Node 18+, Bun, Deno, browsers)
- **Two access patterns** – individual modules (`client.financialNews.getFinancialNews()`) or flat methods (`client.getFinancialNews()`)
- **Format-aware** – automatically returns parsed JSON, raw CSV/XML strings, or `ArrayBuffer` for binary data

## Install

```bash
npm install eodhd
```

## Quick Start

```ts
import { EODHDClient } from "eodhd";

const client = new EODHDClient({
  apiKey: process.env.EODHD_API_TOKEN!,
});

// End-of-day prices
const bars = await client.getEod("AAPL.US", {
  from: "2025-01-01",
  to: "2025-06-30",
});

// Real-time quote
const quote = await client.getLiveStockPrices("AAPL.US");

// Company fundamentals
const fundamentals = await client.getFundamentals("AAPL.US");

// Financial news
const news = await client.getFinancialNews({ s: "AAPL.US", limit: 10 });
```

## Configuration

```ts
const client = new EODHDClient({
  apiKey: "your-token",      // Required – EODHD API token
  baseUrl: "https://eodhd.com/api",  // Default
  timeoutMs: 30_000,         // Request timeout (default 30s)
  defaultParams: { fmt: "json" },    // Added to every request
  userAgent: "my-app/1.0",   // Optional User-Agent header
  fetch: customFetch,        // Optional custom fetch implementation
});
```

## Modular API Access

Every EODHD endpoint is available as a dedicated module on the client:

```ts
// Core market data
await client.eodHistoricalData.getEod("AAPL.US", { from: "2025-01-01" });
await client.intradayData.getIntraday("AAPL.US", { interval: "5m" });
await client.liveStockPrices.getLiveStockPrices("AAPL.US");
await client.liveExtendedQuotes.getLiveExtendedQuotes("AAPL.US");
await client.tickData.getTicks("AAPL.US");
await client.technicalIndicator.getTechnical("AAPL.US", { function: "rsi", period: 14 });
await client.historicalMarketCap.getHistoricalMarketCap("AAPL.US");

// Fundamentals
await client.fundamentals.getFundamentals("AAPL.US");
await client.bulkFundamentals.getBulkFundamentals("US");

// Corporate actions
await client.historicalDividends.getHistoricalDividends("AAPL.US");
await client.historicalSplits.getHistoricalSplits("AAPL.US");

// Bulk
await client.bulkEod.getBulkEodLastDay("US");

// Calendar
await client.upcomingEarnings.getUpcomingEarnings({ from: "2025-01-01" });
await client.upcomingIpos.getUpcomingIpos();
await client.upcomingSplits.getUpcomingSplits();
await client.upcomingDividends.getUpcomingDividends();
await client.earningsTrends.getEarningsTrends({ symbols: "AAPL.US" });

// Exchanges & search
await client.exchangesList.getExchangesList();
await client.exchangeDetails.getExchangeDetails("US");
await client.exchangeTickers.getExchangeTickers("US");
await client.search.searchSymbols("Apple");
await client.symbolChangeHistory.getSymbolChangeHistory();

// News & sentiment
await client.financialNews.getFinancialNews({ s: "AAPL.US", limit: 10 });
await client.sentimentData.getSentimentData({ s: "AAPL.US" });
await client.newsWordWeights.getNewsWordWeights({ s: "AAPL.US" });

// Insider transactions
await client.insiderTransactions.getInsiderTransactions({ code: "AAPL.US" });

// Macro & economic
await client.macroIndicators.getMacroIndicator("USA", { indicator: "gdp_current_usd" });
await client.economicEvents.getEconomicEvents({ country: "US" });

// Stock screener
await client.stockScreener.getStockScreener({ filters: "market_capitalization>1000000000" });

// Options (Marketplace)
await client.optionsContracts.getOptionsContracts({ "filter[underlying_symbol]": "AAPL" });
await client.optionsEod.getOptionsEod({ "filter[date]": "2025-01-15" });
await client.optionsUnderlyings.getOptionsUnderlyings();

// Indices (Marketplace)
await client.indicesList.getIndicesList();
await client.indexComponents.getIndexComponents("GSPC");

// CBOE
await client.cboeIndicesList.getCboeIndicesList();
await client.cboeIndexData.getCboeIndexData({ "filter[index_code]": "VIX", "filter[feed_type]": "eod", "filter[date]": "2025-01-15" });

// Logos
await client.logo.getLogo("AAPL.US");     // ArrayBuffer (PNG)
await client.logoSvg.getLogoSvg("AAPL.US"); // string (SVG)

// User account
await client.user.getUser();

// Marketplace tick data
await client.marketplaceTickData.getMarketplaceTickData({ s: "AAPL.US" });

// TradingHours (Marketplace)
await client.tradingHoursListMarkets.getTradingHoursListMarkets();
await client.tradingHoursLookupMarkets.getTradingHoursLookupMarkets({ q: "NYSE" });
await client.tradingHoursMarketDetails.getTradingHoursMarketDetails({ fin_id: "us.nyse" });
await client.tradingHoursMarketStatus.getTradingHoursMarketStatus({ fin_id: "us.nyse" });

// US Treasury rates
await client.ustBillRates.getUSTBillRates();
await client.ustLongTermRates.getUSTLongTermRates();
await client.ustYieldRates.getUSTYieldRates();
await client.ustRealYieldRates.getUSTRealYieldRates();

// Illio market insights (Marketplace)
await client.illioBestWorst.getIllioBestWorst("SnP500");
await client.illioBetaBands.getIllioBetaBands("SnP500");
await client.illioPerformanceInsights.getIllioPerformanceInsights("SnP500");
await client.illioRiskInsights.getIllioRiskInsights("SnP500");

// Investverte ESG (Marketplace)
await client.investverteListCompanies.getInvestverteListCompanies();
await client.investverteViewCompany.getInvestverteViewCompany("AAPL.US");
await client.investverteViewCountry.getInvestverteViewCountry("US");
await client.investverteViewSector.getInvestverteViewSector("Technology");

// PRAAMS (Marketplace)
await client.praamsBondAnalyzeByIsin.getPraamsBondAnalyzeByIsin("US912828YA28");
await client.praamsRiskScoringByTicker.getPraamsRiskScoringByTicker("AAPL.US");
await client.praamsSmartScreenerEquity.getPraamsSmartScreenerEquity({ mainRatioMin: 0 });
```

## Flat Convenience Methods

All module methods are also available directly on the client for simpler code:

```ts
// These two calls are identical:
await client.financialNews.getFinancialNews({ s: "AAPL.US" });
await client.getFinancialNews({ s: "AAPL.US" });
```

## Response Formats

Most endpoints accept `fmt` to control the response format:

```ts
// JSON (default) – returns parsed objects
const json = await client.getEod("AAPL.US");

// CSV – returns raw string
const csv = await client.getEod("AAPL.US", { fmt: "csv" });

// Binary – getLogo returns ArrayBuffer
const logo = await client.getLogo("AAPL.US");
```

## Generic Requests

Use `request()` directly for custom or new endpoints:

```ts
const data = await client.request<MyType>({
  path: "/exchange-details/{exchangeCode}",
  pathParams: { exchangeCode: "US" },
  params: { fmt: "json" },
});
```

## Using Standalone Modules

API modules can be instantiated independently with a custom requester function, useful for testing or custom HTTP setups:

```ts
import { EodHistoricalDataAPI, type RequesterFn } from "eodhd";

const myRequester: RequesterFn = async (options) => {
  // your custom HTTP logic
};

const eodApi = new EodHistoricalDataAPI(myRequester);
const bars = await eodApi.getEod("AAPL.US");
```

## API Modules (74)

### Core Market Data

| Module | Client Property | Method |
|--------|-----------------|--------|
| `EodHistoricalDataAPI` | `client.eodHistoricalData` | `getEod` |
| `IntradayDataAPI` | `client.intradayData` | `getIntraday` |
| `LiveStockPricesAPI` | `client.liveStockPrices` | `getLiveStockPrices` |
| `LiveExtendedQuotesAPI` | `client.liveExtendedQuotes` | `getLiveExtendedQuotes` |
| `TickDataAPI` | `client.tickData` | `getTicks` |
| `TechnicalIndicatorAPI` | `client.technicalIndicator` | `getTechnical` |
| `HistoricalMarketCapAPI` | `client.historicalMarketCap` | `getHistoricalMarketCap` |

### Fundamentals

| Module | Client Property | Method |
|--------|-----------------|--------|
| `FundamentalsAPI` | `client.fundamentals` | `getFundamentals` |
| `BulkFundamentalsAPI` | `client.bulkFundamentals` | `getBulkFundamentals` |

### Corporate Actions

| Module | Client Property | Method |
|--------|-----------------|--------|
| `HistoricalDividendsAPI` | `client.historicalDividends` | `getHistoricalDividends` |
| `HistoricalSplitsAPI` | `client.historicalSplits` | `getHistoricalSplits` |
| `BulkEodAPI` | `client.bulkEod` | `getBulkEodLastDay` |

### Calendar & Events

| Module | Client Property | Method |
|--------|-----------------|--------|
| `UpcomingEarningsAPI` | `client.upcomingEarnings` | `getUpcomingEarnings` |
| `UpcomingIPOsAPI` | `client.upcomingIpos` | `getUpcomingIpos` |
| `UpcomingSplitsAPI` | `client.upcomingSplits` | `getUpcomingSplits` |
| `UpcomingDividendsAPI` | `client.upcomingDividends` | `getUpcomingDividends` |
| `EarningsTrendsAPI` | `client.earningsTrends` | `getEarningsTrends` |

### Exchanges & Search

| Module | Client Property | Method |
|--------|-----------------|--------|
| `ExchangesListAPI` | `client.exchangesList` | `getExchangesList` |
| `ExchangeDetailsAPI` | `client.exchangeDetails` | `getExchangeDetails` |
| `ExchangeTickersAPI` | `client.exchangeTickers` | `getExchangeTickers` |
| `SearchAPI` | `client.search` | `searchSymbols` |
| `SymbolChangeHistoryAPI` | `client.symbolChangeHistory` | `getSymbolChangeHistory` |

### News & Sentiment

| Module | Client Property | Method |
|--------|-----------------|--------|
| `FinancialNewsAPI` | `client.financialNews` | `getFinancialNews` |
| `SentimentDataAPI` | `client.sentimentData` | `getSentimentData` |
| `NewsWordWeightsAPI` | `client.newsWordWeights` | `getNewsWordWeights` |
| `InsiderTransactionsAPI` | `client.insiderTransactions` | `getInsiderTransactions` |

### Macro & Economic

| Module | Client Property | Method |
|--------|-----------------|--------|
| `MacroIndicatorsAPI` | `client.macroIndicators` | `getMacroIndicator` |
| `EconomicEventsAPI` | `client.economicEvents` | `getEconomicEvents` |

### Stock Screener

| Module | Client Property | Method |
|--------|-----------------|--------|
| `StockScreenerAPI` | `client.stockScreener` | `getStockScreener` |

### Options (Marketplace)

| Module | Client Property | Method |
|--------|-----------------|--------|
| `OptionsContractsAPI` | `client.optionsContracts` | `getOptionsContracts` |
| `OptionsEodAPI` | `client.optionsEod` | `getOptionsEod` |
| `OptionsUnderlyingsAPI` | `client.optionsUnderlyings` | `getOptionsUnderlyings` |

### Indices (Marketplace)

| Module | Client Property | Method |
|--------|-----------------|--------|
| `IndicesListAPI` | `client.indicesList` | `getIndicesList` |
| `IndexComponentsAPI` | `client.indexComponents` | `getIndexComponents` |

### CBOE

| Module | Client Property | Method |
|--------|-----------------|--------|
| `CboeIndicesListAPI` | `client.cboeIndicesList` | `getCboeIndicesList` |
| `CboeIndexDataAPI` | `client.cboeIndexData` | `getCboeIndexData` |

### Logos

| Module | Client Property | Method |
|--------|-----------------|--------|
| `LogoAPI` | `client.logo` | `getLogo` |
| `LogoSvgAPI` | `client.logoSvg` | `getLogoSvg` |

### Account

| Module | Client Property | Method |
|--------|-----------------|--------|
| `UserAPI` | `client.user` | `getUser` |

### Marketplace Tick Data

| Module | Client Property | Method |
|--------|-----------------|--------|
| `MarketplaceTickDataAPI` | `client.marketplaceTickData` | `getMarketplaceTickData` |

### TradingHours (Marketplace)

| Module | Client Property | Method |
|--------|-----------------|--------|
| `TradingHoursListMarketsAPI` | `client.tradingHoursListMarkets` | `getTradingHoursListMarkets` |
| `TradingHoursLookupMarketsAPI` | `client.tradingHoursLookupMarkets` | `getTradingHoursLookupMarkets` |
| `TradingHoursMarketDetailsAPI` | `client.tradingHoursMarketDetails` | `getTradingHoursMarketDetails` |
| `TradingHoursMarketStatusAPI` | `client.tradingHoursMarketStatus` | `getTradingHoursMarketStatus` |

### US Treasury Rates

| Module | Client Property | Method |
|--------|-----------------|--------|
| `USTBillRatesAPI` | `client.ustBillRates` | `getUSTBillRates` |
| `USTLongTermRatesAPI` | `client.ustLongTermRates` | `getUSTLongTermRates` |
| `USTYieldRatesAPI` | `client.ustYieldRates` | `getUSTYieldRates` |
| `USTRealYieldRatesAPI` | `client.ustRealYieldRates` | `getUSTRealYieldRates` |

### Illio Market Insights (Marketplace)

| Module | Client Property | Method |
|--------|-----------------|--------|
| `IllioBestWorstAPI` | `client.illioBestWorst` | `getIllioBestWorst` |
| `IllioBetaBandsAPI` | `client.illioBetaBands` | `getIllioBetaBands` |
| `IllioLargestVolatilityAPI` | `client.illioLargestVolatility` | `getIllioLargestVolatility` |
| `IllioPerformanceInsightsAPI` | `client.illioPerformanceInsights` | `getIllioPerformanceInsights` |
| `IllioPerformanceVsMarketAPI` | `client.illioPerformanceVsMarket` | `getIllioPerformanceVsMarket` |
| `IllioRiskInsightsAPI` | `client.illioRiskInsights` | `getIllioRiskInsights` |
| `IllioRiskReturnAPI` | `client.illioRiskReturn` | `getIllioRiskReturn` |
| `IllioVolatilityBandsAPI` | `client.illioVolatilityBands` | `getIllioVolatilityBands` |

### Investverte ESG (Marketplace)

| Module | Client Property | Method |
|--------|-----------------|--------|
| `InvestverteListCompaniesAPI` | `client.investverteListCompanies` | `getInvestverteListCompanies` |
| `InvestverteListCountriesAPI` | `client.investverteListCountries` | `getInvestverteListCountries` |
| `InvestverteListSectorsAPI` | `client.investverteListSectors` | `getInvestverteListSectors` |
| `InvestverteViewCompanyAPI` | `client.investverteViewCompany` | `getInvestverteViewCompany` |
| `InvestverteViewCountryAPI` | `client.investverteViewCountry` | `getInvestverteViewCountry` |
| `InvestverteViewSectorAPI` | `client.investverteViewSector` | `getInvestverteViewSector` |

### PRAAMS (Marketplace)

| Module | Client Property | Method |
|--------|-----------------|--------|
| `PraamsBankBalanceSheetByIsinAPI` | `client.praamsBankBalanceSheetByIsin` | `getPraamsBankBalanceSheetByIsin` |
| `PraamsBankBalanceSheetByTickerAPI` | `client.praamsBankBalanceSheetByTicker` | `getPraamsBankBalanceSheetByTicker` |
| `PraamsBankIncomeStatementByIsinAPI` | `client.praamsBankIncomeStatementByIsin` | `getPraamsBankIncomeStatementByIsin` |
| `PraamsBankIncomeStatementByTickerAPI` | `client.praamsBankIncomeStatementByTicker` | `getPraamsBankIncomeStatementByTicker` |
| `PraamsBondAnalyzeByIsinAPI` | `client.praamsBondAnalyzeByIsin` | `getPraamsBondAnalyzeByIsin` |
| `PraamsReportBondByIsinAPI` | `client.praamsReportBondByIsin` | `getPraamsReportBondByIsin` |
| `PraamsReportEquityByIsinAPI` | `client.praamsReportEquityByIsin` | `getPraamsReportEquityByIsin` |
| `PraamsReportEquityByTickerAPI` | `client.praamsReportEquityByTicker` | `getPraamsReportEquityByTicker` |
| `PraamsRiskScoringByIsinAPI` | `client.praamsRiskScoringByIsin` | `getPraamsRiskScoringByIsin` |
| `PraamsRiskScoringByTickerAPI` | `client.praamsRiskScoringByTicker` | `getPraamsRiskScoringByTicker` |
| `PraamsSmartScreenerBondAPI` | `client.praamsSmartScreenerBond` | `getPraamsSmartScreenerBond` |
| `PraamsSmartScreenerEquityAPI` | `client.praamsSmartScreenerEquity` | `getPraamsSmartScreenerEquity` |

## Error Handling

The library provides a typed error hierarchy:

```ts
import { EODHDError, EODHDConfigError, EODHDHttpError, EODHDTimeoutError } from "eodhd";

try {
  await client.getEod("INVALID");
} catch (error) {
  if (error instanceof EODHDHttpError) {
    console.error(error.status);      // 404
    console.error(error.statusText);   // "Not Found"
    console.error(error.url);          // full request URL
    console.error(error.body);         // response body text
  }
  if (error instanceof EODHDTimeoutError) {
    console.error("Request timed out");
  }
}
```

| Error class | When thrown |
|------------|------------|
| `EODHDConfigError` | Missing API key, unavailable fetch, missing path parameter |
| `EODHDHttpError` | Non-2xx HTTP response (includes `status`, `statusText`, `url`, `body`) |
| `EODHDTimeoutError` | Request exceeded `timeoutMs` |

## Testing

```bash
npm test
```

## Building

```bash
npm run build
```

## License

MIT - see [LICENSE](./LICENSE).
