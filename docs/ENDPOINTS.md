# EODHD API Endpoints

All 74 endpoints are available via both the modular API (`client.<module>.<method>()`) and the flat convenience methods (`client.<method>()`).

## Core Market Data

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getEod(ticker, params?)` | `eodHistoricalData` | `GET /eod/{ticker}` | End-of-day OHLCV bars |
| `getIntraday(ticker, params?)` | `intradayData` | `GET /intraday/{ticker}` | Intraday candlestick data |
| `getLiveStockPrices(ticker, params?)` | `liveStockPrices` | `GET /real-time/{ticker}` | Real-time / delayed quotes |
| `getLiveExtendedQuotes(ticker, params?)` | `liveExtendedQuotes` | `GET /us-quote-delayed/{ticker}` | Extended US delayed quotes |
| `getTicks(ticker, params?)` | `tickData` | `GET /ticks/{ticker}` | Tick-level trade data |
| `getTechnical(ticker, params)` | `technicalIndicator` | `GET /technical/{ticker}` | Technical indicators (SMA, EMA, RSI, etc.) |
| `getHistoricalMarketCap(ticker, params?)` | `historicalMarketCap` | `GET /historical-market-cap/{ticker}` | Historical market capitalization |

## Fundamentals

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getFundamentals(ticker, params?)` | `fundamentals` | `GET /fundamentals/{ticker}` | Company fundamental data |
| `getBulkFundamentals(exchange, params?)` | `bulkFundamentals` | `GET /bulk-fundamentals/{exchange}` | Bulk fundamentals for an exchange |

## Corporate Actions

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getHistoricalDividends(ticker, params?)` | `historicalDividends` | `GET /div/{ticker}` | Historical dividends |
| `getHistoricalSplits(ticker, params?)` | `historicalSplits` | `GET /splits/{ticker}` | Historical stock splits |

## Bulk Data

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getBulkEodLastDay(exchange, params?)` | `bulkEod` | `GET /eod-bulk-last-day/{exchange}` | Bulk EOD for last trading day |

## Calendar & Events

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getUpcomingEarnings(params?)` | `upcomingEarnings` | `GET /calendar/earnings` | Earnings calendar |
| `getUpcomingIpos(params?)` | `upcomingIpos` | `GET /calendar/ipos` | IPO calendar |
| `getUpcomingSplits(params?)` | `upcomingSplits` | `GET /calendar/splits` | Splits calendar |
| `getUpcomingDividends(params?)` | `upcomingDividends` | `GET /calendar/dividends` | Dividends calendar |
| `getEarningsTrends(params)` | `earningsTrends` | `GET /calendar/trends` | Earnings trend estimates |

## Exchanges & Search

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getExchangesList(params?)` | `exchangesList` | `GET /exchanges-list` | List all exchanges |
| `getExchangeDetails(code, params?)` | `exchangeDetails` | `GET /exchange-details/{code}` | Exchange trading hours & holidays |
| `getExchangeTickers(code, params?)` | `exchangeTickers` | `GET /exchange-symbol-list/{code}` | Symbols on an exchange |
| `searchSymbols(query, params?)` | `search` | `GET /search/{query}` | Search symbols by name/code |
| `getSymbolChangeHistory(params?)` | `symbolChangeHistory` | `GET /symbol-change-history` | Symbol code change history |

## News & Sentiment

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getFinancialNews(params?)` | `financialNews` | `GET /news` | Financial news articles |
| `getSentimentData(params?)` | `sentimentData` | `GET /sentiments` | Sentiment analysis |
| `getNewsWordWeights(params?)` | `newsWordWeights` | `GET /news-word-weights` | Word weight trends **(aux URL)** |
| `getInsiderTransactions(params?)` | `insiderTransactions` | `GET /insider-transactions` | Insider trading activity **(aux URL)** |

## Macro & Economic

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getMacroIndicator(country, params)` | `macroIndicators` | `GET /macro-indicator/{country}` | Macroeconomic indicators |
| `getEconomicEvents(params?)` | `economicEvents` | `GET /economic-events` | Economic events calendar |

## Stock Screener

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getStockScreener(params?)` | `stockScreener` | `GET /screener` | Stock screener with filters/signals |

## Options (Marketplace)

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getOptionsContracts(params?)` | `optionsContracts` | `GET /mp/unicornbay/options/contracts` | Options contract definitions |
| `getOptionsEod(params?)` | `optionsEod` | `GET /mp/unicornbay/options/eod` | Options EOD data with Greeks |
| `getOptionsUnderlyings(params?)` | `optionsUnderlyings` | `GET /mp/unicornbay/options/underlying-symbols` | Options underlying symbols |

## Indices (Marketplace)

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getIndicesList(params?)` | `indicesList` | `GET /mp/unicornbay/spglobal/list` | S&P Global indices list |
| `getIndexComponents(symbol, params?)` | `indexComponents` | `GET /mp/unicornbay/spglobal/comp/{symbol}` | Index components |

## CBOE

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getCboeIndicesList(params?)` | `cboeIndicesList` | `GET /cboe/indices` | CBOE indices list |
| `getCboeIndexData(params)` | `cboeIndexData` | `GET /cboe/index` | CBOE index data |

## Logos

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getLogo(symbol)` | `logo` | `GET /logo/{symbol}` | Company logo PNG **(aux URL, ArrayBuffer)** |
| `getLogoSvg(symbol)` | `logoSvg` | `GET /logo-svg/{symbol}` | Company logo SVG **(text)** |

## Account

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getUser()` | `user` | `GET /user` | User account & API usage |

## Marketplace Tick Data

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getMarketplaceTickData(params)` | `marketplaceTickData` | `GET /mp/unicornbay/tickdata/ticks` | High-frequency tick data |

## TradingHours (Marketplace)

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getTradingHoursListMarkets(params?)` | `tradingHoursListMarkets` | `GET /mp/tradinghours/markets` | List all markets |
| `getTradingHoursLookupMarkets(params?)` | `tradingHoursLookupMarkets` | `GET /mp/tradinghours/markets/lookup` | Lookup markets by query |
| `getTradingHoursMarketDetails(params)` | `tradingHoursMarketDetails` | `GET /mp/tradinghours/markets/details` | Market details & schedule |
| `getTradingHoursMarketStatus(params)` | `tradingHoursMarketStatus` | `GET /mp/tradinghours/markets/status` | Current market status |

## US Treasury Rates

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getUSTBillRates(params?)` | `ustBillRates` | `GET /mp/unicornbay/ust/bill` | T-Bill auction rates |
| `getUSTLongTermRates(params?)` | `ustLongTermRates` | `GET /mp/unicornbay/ust/lt-rate` | Long-term average rates |
| `getUSTYieldRates(params?)` | `ustYieldRates` | `GET /mp/unicornbay/ust/yield` | Daily yield curve rates |
| `getUSTRealYieldRates(params?)` | `ustRealYieldRates` | `GET /mp/unicornbay/ust/real-yield` | Real yield curve rates |

## Illio Market Insights (Marketplace)

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getIllioBestWorst(indexId)` | `illioBestWorst` | `GET /mp/illio/chapters/best-and-worst/{indexId}` | Best/worst performers |
| `getIllioBetaBands(indexId)` | `illioBetaBands` | `GET /mp/illio/chapters/beta-bands/{indexId}` | Beta band analysis |
| `getIllioLargestVolatility(indexId)` | `illioLargestVolatility` | `GET /mp/illio/chapters/volume/{indexId}` | Largest volatility movers |
| `getIllioPerformanceInsights(indexId)` | `illioPerformanceInsights` | `GET /mp/illio/categories/performance/{indexId}` | Performance insights |
| `getIllioPerformanceVsMarket(indexId)` | `illioPerformanceVsMarket` | `GET /mp/illio/chapters/performance/{indexId}` | Performance vs market |
| `getIllioRiskInsights(indexId)` | `illioRiskInsights` | `GET /mp/illio/categories/risk/{indexId}` | Risk insights |
| `getIllioRiskReturn(indexId)` | `illioRiskReturn` | `GET /mp/illio/chapters/risk/{indexId}` | Risk-return analysis |
| `getIllioVolatilityBands(indexId)` | `illioVolatilityBands` | `GET /mp/illio/chapters/volatility/{indexId}` | Volatility band analysis |

## Investverte ESG (Marketplace)

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getInvestverteListCompanies()` | `investverteListCompanies` | `GET /mp/investverte/companies` | List all ESG-tracked companies |
| `getInvestverteListCountries()` | `investverteListCountries` | `GET /mp/investverte/countries` | List all ESG-tracked countries |
| `getInvestverteListSectors()` | `investverteListSectors` | `GET /mp/investverte/sectors` | List all ESG sectors |
| `getInvestverteViewCompany(symbol, params?)` | `investverteViewCompany` | `GET /mp/investverte/esg/{symbol}` | Company ESG scores |
| `getInvestverteViewCountry(symbol, params?)` | `investverteViewCountry` | `GET /mp/investverte/country/{symbol}` | Country ESG aggregation |
| `getInvestverteViewSector(symbol)` | `investverteViewSector` | `GET /mp/investverte/sector/{symbol}` | Sector ESG analysis |

## PRAAMS (Marketplace)

| Flat Method | Module Property | Endpoint | Description |
|-------------|-----------------|----------|-------------|
| `getPraamsBankBalanceSheetByIsin(isin)` | `praamsBankBalanceSheetByIsin` | `GET /mp/praams/bank/balance_sheet/isin/{isin}` | Bank balance sheet by ISIN |
| `getPraamsBankBalanceSheetByTicker(ticker)` | `praamsBankBalanceSheetByTicker` | `GET /mp/praams/bank/balance_sheet/ticker/{ticker}` | Bank balance sheet by ticker |
| `getPraamsBankIncomeStatementByIsin(isin)` | `praamsBankIncomeStatementByIsin` | `GET /mp/praams/bank/income_statement/isin/{isin}` | Bank income statement by ISIN |
| `getPraamsBankIncomeStatementByTicker(ticker)` | `praamsBankIncomeStatementByTicker` | `GET /mp/praams/bank/income_statement/ticker/{ticker}` | Bank income statement by ticker |
| `getPraamsBondAnalyzeByIsin(isin)` | `praamsBondAnalyzeByIsin` | `GET /mp/praams/analyse/bond/{isin}` | Bond risk analysis by ISIN |
| `getPraamsReportBondByIsin(isin, params)` | `praamsReportBondByIsin` | `GET /mp/praams/reports/bond/{isin}` | Bond PDF report by ISIN |
| `getPraamsReportEquityByIsin(isin, params)` | `praamsReportEquityByIsin` | `GET /mp/praams/reports/equity/isin/{isin}` | Equity PDF report by ISIN |
| `getPraamsReportEquityByTicker(ticker, params)` | `praamsReportEquityByTicker` | `GET /mp/praams/reports/equity/ticker/{ticker}` | Equity PDF report by ticker |
| `getPraamsRiskScoringByIsin(isin)` | `praamsRiskScoringByIsin` | `GET /mp/praams/analyse/equity/isin/{isin}` | Equity risk scoring by ISIN |
| `getPraamsRiskScoringByTicker(ticker)` | `praamsRiskScoringByTicker` | `GET /mp/praams/analyse/equity/ticker/{ticker}` | Equity risk scoring by ticker |
| `getPraamsSmartScreenerBond(body, params?)` | `praamsSmartScreenerBond` | `POST /mp/praams/explore/bond` | Smart bond screener |
| `getPraamsSmartScreenerEquity(body, params?)` | `praamsSmartScreenerEquity` | `POST /mp/praams/explore/equity` | Smart equity screener |

---

**Note:** Endpoints marked **(aux URL)** use `https://eodhistoricaldata.com/api` instead of the primary `https://eodhd.com/api` base URL. This is handled automatically by the library.
