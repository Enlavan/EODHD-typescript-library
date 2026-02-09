# EODHD Endpoints

This adapter exposes the following typed methods. All methods accept query params as shown in the EODHD docs, and return JSON by default (unless `fmt=csv`/`fmt=xml`).

## Market data

- `getEod(ticker, params)` → `/eod/{ticker}`
- `getIntraday(ticker, params)` → `/intraday/{ticker}`
- `getRealTime(ticker, params)` → `/real-time/{ticker}`
- `getTicks(ticker, params)` → `/ticks/{ticker}`
- `getHistoricalMarketCap(ticker, params)` → `/historical-market-cap/{ticker}`
- `getTechnical(ticker, params)` → `/technical/{ticker}`

## Corporate actions

- `getDividends(ticker, params)` → `/div/{ticker}`
- `getSplits(ticker, params)` → `/splits/{ticker}`

## Calendars

- `getCalendarEarnings(params)` → `/calendar/earnings`
- `getCalendarIpos(params)` → `/calendar/ipos`
- `getCalendarSplits(params)` → `/calendar/splits`
- `getEarningsTrends(params)` → `/calendar/trends`

## Exchanges & symbols

- `getExchangeList(params)` → `/exchanges-list`
- `getExchangeDetails(exchangeCode, params)` → `/exchange-details/{exchangeCode}`
- `getExchangeSymbols(exchangeCode, params)` → `/exchange-symbol-list/{exchangeCode}`
- `searchSymbols(query, params)` → `/search/{query}`
- `getSymbolChangeHistory(params)` → `/symbol-change-history`

## News & sentiment

- `getNews(params)` → `/news`
- `getSentiments(params)` → `/sentiments`
- `getNewsWordWeights(params)` → `/news-word-weights` (aux base URL)
- `getInsiderTransactions(params)` → `/insider-transactions` (aux base URL)

## Macro & events

- `getMacroIndicator(country, params)` → `/macro-indicator/{country}`
- `getEconomicEvents(params)` → `/economic-events`

## Screeners

- `getScreener(params)` → `/screener`

## Options

- `getOptionsContracts(params)` → `/mp/unicornbay/options/contracts`
- `getOptionsEod(params)` → `/mp/unicornbay/options/eod`
- `getOptionsUnderlyings(params)` → `/mp/unicornbay/options/underlying-symbols`

## Indices

- `getIndicesList(params)` → `/mp/unicornbay/spglobal/list`
- `getIndexComponents(symbol, params)` → `/mp/unicornbay/spglobal/comp/{symbol}`
- `getCboeIndicesList(params)` → `/cboe/indices`
- `getCboeIndexData(params)` → `/cboe/index`

## Misc

- `getBulkEodLastDay(exchange, params)` → `/eod-bulk-last-day/{exchange}`
- `getInternalUser()` → `/internal-user`
- `getLogo(symbol)` → `/logo/{symbol}` (aux base URL, returns ArrayBuffer)
