export type DateString = string;

// ---------------------------------------------------------------------------
// Query-value helpers
// ---------------------------------------------------------------------------

export type QueryValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | Array<string | number | boolean | Date>;

// ---------------------------------------------------------------------------
// Client options
// ---------------------------------------------------------------------------

export interface EODHDClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
  defaultParams?: Record<string, QueryValue>;
  userAgent?: string;
}

export interface RequestOptions {
  path: string;
  method?: "GET" | "POST";
  baseUrl?: string;
  pathParams?: Record<string, string | number>;
  params?: Record<string, QueryValue>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  responseType?: "json" | "text" | "arrayBuffer";
}

export type RequesterFn = <T>(options: RequestOptions) => Promise<T>;

// ---------------------------------------------------------------------------
// Shared parameter interfaces
// ---------------------------------------------------------------------------

export interface DateRangeParams {
  from?: string;
  to?: string;
}

export interface FmtJsonCsvParams {
  fmt?: "json" | "csv";
}

// ---------------------------------------------------------------------------
// 1. EOD Historical Data — /eod/{ticker}
// ---------------------------------------------------------------------------

export interface EodParams extends DateRangeParams {
  period?: "d" | "w" | "m";
  order?: "a" | "d";
  fmt?: "json" | "csv";
  filter?: string;
}

export interface EodBar {
  date: DateString;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close?: number;
  volume?: number;
}

// ---------------------------------------------------------------------------
// 2. Intraday Data — /intraday/{ticker}
// ---------------------------------------------------------------------------

export interface IntradayParams {
  interval?: "1m" | "5m" | "1h" | string;
  from?: number | string;
  to?: number | string;
  fmt?: "json" | "csv";
}

export interface IntradayBar {
  timestamp: number;
  gmtoffset: number;
  datetime?: string;
  date?: DateString;
  time?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ---------------------------------------------------------------------------
// 3. Live Stock Prices — /real-time/{ticker}
// ---------------------------------------------------------------------------

export interface LiveStockPricesParams {
  fmt?: "json" | "csv";
  s?: string | string[];
}

export interface RealTimeQuote {
  code: string;
  timestamp: number;
  gmtoffset: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  previousClose?: number;
  change?: number;
  change_p?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 4. Live Extended Quotes — /us-quote-delayed/{ticker}
// ---------------------------------------------------------------------------

export interface LiveExtendedQuotesParams {
  fmt?: "json" | "csv";
}

export interface LiveExtendedQuote {
  symbol?: string;
  name?: string;
  exchange?: string;
  type?: string;
  sector?: string;
  industry?: string;
  open?: number;
  high?: number;
  low?: number;
  lastTradePrice?: number;
  volume?: number;
  change?: number;
  changePercent?: number;
  previousClosePrice?: number;
  previousCloseDate?: string;
  fiftyDayAveragePrice?: number;
  twoHundredDayAveragePrice?: number;
  averageVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  marketCap?: number;
  sharesOutstanding?: number;
  pe?: number;
  dividendYield?: number;
  timestamp?: number;
  currency?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 5. Technical Indicators — /technical/{ticker}
// ---------------------------------------------------------------------------

export interface TechnicalParams {
  function: string;
  period?: number;
  fmt?: "json" | "csv";
  order?: "a" | "d";
  splitadjusted_only?: string;
  from?: string;
  to?: string;
  [key: string]: QueryValue;
}

export interface TechnicalRecord {
  date: DateString;
  [key: string]: string | number | undefined;
}

// ---------------------------------------------------------------------------
// 6. Historical Market Cap — /historical-market-cap/{ticker}
// ---------------------------------------------------------------------------

export interface HistoricalMarketCapParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface HistoricalMarketCapRecord {
  date: DateString;
  value: number;
}

// ---------------------------------------------------------------------------
// 7. Tick Data — /ticks/{ticker}
// ---------------------------------------------------------------------------

export interface TickParams {
  from?: number | string;
  to?: number | string;
  limit?: number;
  fmt?: "json" | "csv";
}

export interface TickTrade {
  timestamp: number;
  gmtoffset: number;
  datetime?: string;
  price: number;
  volume: number;
}

// ---------------------------------------------------------------------------
// 8. Fundamentals — /fundamentals/{ticker}
// ---------------------------------------------------------------------------

export interface FundamentalsParams {
  filter?: string;
  fmt?: "json" | "csv";
}

export type FundamentalsResponse = Record<string, unknown>;

// ---------------------------------------------------------------------------
// 9. Bulk Fundamentals — /bulk-fundamentals/{exchange}
// ---------------------------------------------------------------------------

export interface BulkFundamentalsParams {
  symbols?: string;
  offset?: number;
  limit?: number;
  fmt?: "json" | "csv";
}

// ---------------------------------------------------------------------------
// 10. Historical Dividends — /div/{ticker}
// ---------------------------------------------------------------------------

export interface HistoricalDividendsParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface DividendRecord {
  date: DateString;
  declarationDate?: DateString;
  recordDate?: DateString;
  paymentDate?: DateString;
  period?: string;
  value?: number;
  unadjustedValue?: number;
  currency?: string;
}

// ---------------------------------------------------------------------------
// 11. Historical Splits — /splits/{ticker}
// ---------------------------------------------------------------------------

export interface HistoricalSplitsParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface SplitRecord {
  date: DateString;
  split?: string;
  split_ratio?: number;
  ratio?: number;
}

// ---------------------------------------------------------------------------
// 12. Upcoming Earnings — /calendar/earnings
// ---------------------------------------------------------------------------

export interface UpcomingEarningsParams extends DateRangeParams {
  symbols?: string;
  fmt?: "json" | "csv";
}

export interface UpcomingEarningsResponse {
  type: string;
  description: string;
  from?: DateString;
  to?: DateString;
  earnings: CalendarEarning[];
}

export interface CalendarEarning {
  code: string;
  report_date: DateString;
  date: DateString;
  before_after_market?: string | null;
  currency?: string;
  actual?: number | null;
  estimate?: number | null;
  difference?: number | null;
  percent?: number | null;
}

// ---------------------------------------------------------------------------
// 13. Upcoming IPOs — /calendar/ipos
// ---------------------------------------------------------------------------

export interface UpcomingIposParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface UpcomingIposResponse {
  type: string;
  description: string;
  from?: DateString;
  to?: DateString;
  ipos: CalendarIpo[];
}

export interface CalendarIpo {
  code: string;
  exchange: string;
  name: string;
  currency?: string;
  start_date?: DateString;
  filing_date?: DateString;
  amended_date?: DateString;
  price_from?: number | null;
  price_to?: number | null;
  offer_price?: number | null;
  shares?: number | null;
  deal_type?: string;
}

// ---------------------------------------------------------------------------
// 14. Upcoming Splits — /calendar/splits
// ---------------------------------------------------------------------------

export interface UpcomingSplitsParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface UpcomingSplitsResponse {
  type: string;
  description: string;
  from?: DateString;
  to?: DateString;
  splits: CalendarSplitRecord[];
}

export interface CalendarSplitRecord {
  code: string;
  split_date: DateString;
  optionable?: string;
  old_shares?: number;
  new_shares?: number;
}

// ---------------------------------------------------------------------------
// 15. Upcoming Dividends — /calendar/dividends
// ---------------------------------------------------------------------------

export interface UpcomingDividendsParams {
  "filter[symbol]"?: string;
  "filter[date_eq]"?: string;
  "filter[date_from]"?: string;
  "filter[date_to]"?: string;
  "page[limit]"?: number;
  "page[offset]"?: number;
  fmt?: "json";
  [key: string]: QueryValue;
}

export interface UpcomingDividendsResponse {
  meta: { total: number; offset: number; limit: number };
  data: UpcomingDividendRecord[];
  links?: { next?: string | null };
}

export interface UpcomingDividendRecord {
  date: DateString;
  symbol: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 16. Earnings Trends — /calendar/trends
// ---------------------------------------------------------------------------

export interface EarningsTrendsParams {
  symbols: string;
  fmt?: "json" | "csv";
}

export interface EarningsTrend {
  code: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 17. Exchanges List — /exchanges-list
// ---------------------------------------------------------------------------

export interface ExchangesListParams {
  fmt?: "json" | "csv";
}

export interface ExchangeInfo {
  Name: string;
  Code: string;
  OperatingMIC?: string;
  Country?: string;
  Currency?: string;
  CountryISO2?: string;
  CountryISO3?: string;
}

// ---------------------------------------------------------------------------
// 18. Exchange Details — /exchange-details/{code}
// ---------------------------------------------------------------------------

export interface ExchangeDetailsParams {
  fmt?: "json" | "csv";
  from?: string;
  to?: string;
}

export interface ExchangeDetails {
  Name: string;
  Code: string;
  OperatingMIC?: string;
  Country?: string;
  Currency?: string;
  Timezone?: string;
  isOpen?: boolean;
  TradingHours?: {
    Open?: string;
    Close?: string;
    OpenUTC?: string;
    CloseUTC?: string;
    WorkingDays?: string;
    [key: string]: unknown;
  };
  ExchangeHolidays?: Record<string, unknown>;
  ExchangeEarlyCloseDays?: Record<string, unknown>;
  ActiveTickers?: number;
  UpdatedTickers?: number;
  PreviousDayUpdatedTickers?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 19. Exchange Tickers — /exchange-symbol-list/{code}
// ---------------------------------------------------------------------------

export interface ExchangeTickersParams {
  fmt?: "json" | "csv";
  type?: string;
}

export interface ExchangeSymbol {
  Code: string;
  Name: string;
  Country?: string;
  Exchange?: string;
  Currency?: string;
  Type?: string;
  Isin?: string | null;
}

// ---------------------------------------------------------------------------
// 20. Search — /search/{query}
// ---------------------------------------------------------------------------

export interface SearchParams {
  limit?: number;
  bonds_only?: 0 | 1;
  type?: string;
  exchange?: string;
  fmt?: "json" | "csv";
}

export interface SearchResult {
  Code: string;
  Exchange: string;
  Name: string;
  Type: string;
  Country: string;
  Currency: string;
  ISIN?: string | null;
  previousClose?: number;
  previousCloseDate?: DateString;
  isPrimary?: boolean;
}

// ---------------------------------------------------------------------------
// 21. Symbol Change History — /symbol-change-history
// ---------------------------------------------------------------------------

export interface SymbolChangeHistoryParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface SymbolChange {
  exchange: string;
  old_symbol: string;
  new_symbol: string;
  company_name?: string;
  effective: DateString;
}

// ---------------------------------------------------------------------------
// 22. Financial News — /news
// ---------------------------------------------------------------------------

export interface FinancialNewsParams {
  s?: string | string[];
  t?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
  fmt?: "json" | "xml";
}

export interface NewsArticle {
  date: string;
  title: string;
  content?: string;
  link?: string;
  symbols?: string[];
  tags?: string[];
  sentiment?: {
    polarity?: number;
    neg?: number;
    neu?: number;
    pos?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 23. Sentiment Data — /sentiments
// ---------------------------------------------------------------------------

export interface SentimentDataParams extends DateRangeParams {
  s?: string | string[];
  fmt?: "json" | "csv";
}

export interface SentimentRecord {
  date: DateString;
  count: number;
  normalized: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 24. News Word Weights — /news-word-weights
// ---------------------------------------------------------------------------

export interface NewsWordWeightsParams extends DateRangeParams {
  s?: string | string[];
  limit?: number;
  fmt?: "json" | "csv";
}

// ---------------------------------------------------------------------------
// 25. Insider Transactions — /insider-transactions
// ---------------------------------------------------------------------------

export interface InsiderTransactionsParams {
  code?: string;
  from?: string;
  to?: string;
  limit?: number;
  fmt?: "json" | "csv";
}

export interface InsiderTransaction {
  code: string;
  date: DateString;
  reportDate?: DateString;
  ownerName?: string;
  ownerCik?: string;
  ownerTitle?: string;
  transactionDate?: DateString;
  transactionCode?: string;
  transactionAmount?: number;
  transactionPrice?: number | null;
  transactionAcquiredDisposed?: string;
  postTransactionAmount?: number;
  secLink?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 26. Macro Indicators — /macro-indicator/{country}
// ---------------------------------------------------------------------------

export interface MacroIndicatorParams {
  indicator: string;
  fmt?: "json" | "csv";
}

export interface MacroIndicatorRecord {
  CountryCode: string;
  CountryName?: string;
  Indicator: string;
  Date: DateString;
  Period: string;
  Value: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 27. Economic Events — /economic-events
// ---------------------------------------------------------------------------

export interface EconomicEventsParams extends DateRangeParams {
  country?: string;
  comparison?: string;
  offset?: number;
  limit?: number;
  fmt?: "json" | "csv";
}

export interface EconomicEvent {
  type: string;
  comparison?: string | null;
  period?: string | null;
  country: string;
  date: DateString;
  actual?: number | string | null;
  previous?: number | string | null;
  estimate?: number | string | null;
  change?: number | null;
  change_percentage?: number | null;
  impact?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 28. Stock Screener — /screener
// ---------------------------------------------------------------------------

export interface StockScreenerParams {
  sort?: string;
  filters?: string;
  signals?: string;
  limit?: number;
  offset?: number;
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface StockScreenerResponse {
  count: number;
  data: StockScreenerRecord[];
}

export interface StockScreenerRecord {
  code: string;
  name?: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  market_capitalization?: number;
  earnings_share?: number;
  dividend_yield?: number;
  pe?: number;
  peg?: number;
  pb?: number;
  ps?: number;
  roe?: number;
  roa?: number;
  beta?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 29. Options Contracts — /mp/unicornbay/options/contracts
// ---------------------------------------------------------------------------

export interface OptionsContractsParams {
  "filter[expiration_date.gte]"?: string;
  "filter[expiration_date.lte]"?: string;
  "filter[strike_price.gte]"?: number;
  "filter[strike_price.lte]"?: number;
  "filter[type]"?: string;
  "filter[underlying_symbol]"?: string;
  "page[size]"?: number;
  "page[number]"?: number;
  sort?: string;
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface OptionsContract {
  contract: string;
  underlying_symbol: string;
  exp_date: DateString;
  expiration_type?: string;
  type: string;
  strike: number;
  exchange?: string;
  currency?: string;
  open?: number;
  high?: number;
  low?: number;
  last?: number;
  bid?: number;
  ask?: number;
  volume?: number;
  open_interest?: number;
  volatility?: number;
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
  dte?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 30. Options EOD — /mp/unicornbay/options/eod
// ---------------------------------------------------------------------------

export interface OptionsEodParams {
  "filter[date]"?: string;
  "filter[date.gte]"?: string;
  "filter[date.lte]"?: string;
  "filter[contract_id]"?: string;
  "filter[underlying_symbol]"?: string;
  "page[size]"?: number;
  "page[number]"?: number;
  sort?: string;
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface OptionsEodRecord {
  contract: string;
  underlying_symbol?: string;
  exp_date?: DateString;
  type?: string;
  strike?: number;
  tradetime?: DateString;
  open?: number;
  high?: number;
  low?: number;
  last?: number;
  bid?: number;
  ask?: number;
  volume?: number;
  open_interest?: number;
  volatility?: number;
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 31. Options Underlyings — /mp/unicornbay/options/underlying-symbols
// ---------------------------------------------------------------------------

export interface OptionsUnderlyingsParams {
  "page[size]"?: number;
  "page[number]"?: number;
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

// ---------------------------------------------------------------------------
// 32. Indices List — /mp/unicornbay/spglobal/list
// ---------------------------------------------------------------------------

export interface IndicesListParams {
  fmt?: "json" | "csv";
}

export interface IndexInfo {
  ID?: string;
  Code: string;
  Name: string;
  Constituents?: number;
  Value?: number;
  MarketCap?: number | null;
  DailyReturn?: number;
  CurrencyCode?: string;
  CurrencyName?: string;
  LastUpdate?: DateString;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 33. Index Components — /mp/unicornbay/spglobal/comp/{symbol}
// ---------------------------------------------------------------------------

export interface IndexComponentsParams {
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface IndexComponent {
  Code: string;
  Exchange: string;
  Name: string;
  Sector?: string;
  Industry?: string;
  Weight?: number | null;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 34. CBOE Indices List — /cboe/indices
// ---------------------------------------------------------------------------

export interface CboeIndicesListParams {
  fmt?: "json" | "xml";
}

export interface CboeIndex {
  index_code: string;
  feed_type: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 35. CBOE Index Data — /cboe/index
// ---------------------------------------------------------------------------

export interface CboeIndexDataParams {
  "filter[index_code]": string;
  "filter[feed_type]": string;
  "filter[date]": string;
  fmt?: "json" | "xml";
}

// ---------------------------------------------------------------------------
// 36. Bulk EOD — /eod-bulk-last-day/{exchange}
// ---------------------------------------------------------------------------

export interface BulkEodParams {
  date?: string;
  symbols?: string;
  filter?: string;
  type?: string;
  fmt?: "json" | "csv";
}

export interface BulkEodRecord {
  code: string;
  exchange_short_name?: string;
  date: DateString;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  adjusted_close?: number;
  volume?: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 37. User — /user
// ---------------------------------------------------------------------------

export interface UserInfo {
  name?: string;
  email?: string;
  subscriptionType?: string;
  paymentMethod?: string;
  apiRequests?: number;
  apiRequestsDate?: DateString;
  dailyRateLimit?: number;
  extraLimit?: number;
  subscriptionMode?: string;
  canManageOrganizations?: boolean;
  availableDataFeeds?: string[];
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 38. Logo PNG — /logo/{symbol}
// 39. Logo SVG — /logo-svg/{symbol}
// ---------------------------------------------------------------------------

// (No params/response types needed — binary responses)

// ---------------------------------------------------------------------------
// 40–43. US Treasury Rates
// ---------------------------------------------------------------------------

export interface USTRatesParams {
  "filter[year]"?: number;
  "page[limit]"?: number;
  "page[offset]"?: number;
  [key: string]: QueryValue;
}

export interface USTBillRate {
  date: DateString;
  tenor: string;
  discount: number;
  coupon: number;
  avg_discount: number;
  avg_coupon: number;
  maturity_date: DateString;
  cusip: string;
}

export interface USTLongTermRate {
  date: DateString;
  rate_type: string;
  rate: number;
  extrapolation_factor?: number | null;
}

export interface USTYieldRate {
  date: DateString;
  tenor: string;
  rate: number;
}

export interface USTRealYieldRate {
  date: DateString;
  tenor: string;
  rate: number;
}

export interface USTPaginatedResponse<T> {
  meta: { total: number };
  data: T[];
  links?: { next?: string | null };
}

// ---------------------------------------------------------------------------
// 44–47. TradingHours Marketplace
// ---------------------------------------------------------------------------

export interface TradingHoursListParams {
  group?: "core" | "extended" | "all" | "allowed";
}

export interface TradingHoursLookupParams {
  q?: string;
  group?: "core" | "extended" | "all" | "allowed";
}

export interface TradingHoursMarketDetailsParams {
  fin_id: string;
}

export interface TradingHoursMarketStatusParams {
  fin_id: string;
}

export interface TradingHoursMarket {
  fin_id: string;
  exchange: string;
  market?: string | null;
  products?: string | null;
  mic: string;
  asset_type: string;
  group: string;
  permanently_closed?: string | null;
  holidays_min_date?: string;
  holidays_max_date?: string;
  [key: string]: unknown;
}

export interface TradingHoursMarketDetail extends TradingHoursMarket {
  country_code?: string;
  mic_extended?: string;
  acronym?: string;
  memo?: string | null;
  timezone?: string;
  weekend_definition?: string;
}

export interface TradingHoursMarketStatus {
  fin_id: string;
  exchange: string;
  market?: string | null;
  products?: string | null;
  timezone: string;
  status: string;
  reason?: string | null;
  until?: string;
  next_bell?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 48. Marketplace Tick Data — /mp/unicornbay/tickdata/ticks
// ---------------------------------------------------------------------------

export interface MarketplaceTickDataParams {
  s: string;
  from?: number;
  to?: number;
  limit?: number;
}

export interface MarketplaceTickDataResponse {
  ts: number[];
  price: number[];
  shares: number[];
  mkt: string[];
  seq: number[];
  sl: string[];
  sub_mkt: string[];
}

// ---------------------------------------------------------------------------
// 49–56. Illio Market Insights
// ---------------------------------------------------------------------------

export type IllioIndexId = "SnP500" | "DJI" | "NDX" | string;

export interface IllioChapterInsight {
  insightId: string;
  categoryId: string;
  title: string;
  watchlistName: string;
  insight: {
    id: string;
    title: string;
    whyImportant: string;
    description: string;
    stats: Array<{ text: string }>;
  };
  chart: {
    title: string;
    data: Record<string, unknown>;
  };
  [key: string]: unknown;
}

export interface IllioCategoryInsight {
  watchlist: { displayName: string; id: string };
  insight: Array<{
    id: string;
    title: string;
    chart: Array<{
      subTitle?: string | null;
      whyImportant?: string;
      rows?: Array<Record<string, unknown>>;
      children?: unknown[];
    }>;
  }>;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 57–62. Investverte ESG
// ---------------------------------------------------------------------------

export interface InvestverteCompany {
  symbol: string;
  name: string;
}

export interface InvestverteCountry {
  country_code: string;
  country_descr: string;
}

export interface InvestverteSector {
  sector: string;
}

export interface InvestverteEsgViewParams {
  year?: number;
  frequency?: string;
}

export interface InvestverteEsgScore {
  e: number;
  s: number;
  g: number;
  esg: number;
  year: number;
  frequency: string;
  [key: string]: unknown;
}

export interface InvestverteCountryView {
  symbol: string;
  name: string;
  mean: number;
  median: number;
  year: number;
  frequency: string;
  [key: string]: unknown;
}

export interface InvestverteSectorView {
  find: boolean;
  industry: Record<string, unknown>;
  years: string[];
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// 63–74. PRAAMS
// ---------------------------------------------------------------------------

export interface PraamsResponse<T = unknown> {
  success: boolean;
  message: string;
  errors: unknown[];
  items?: T[];
  item?: T;
}

export interface PraamsBankBalanceSheetRecord {
  date: string;
  period: string;
  isQuarter: boolean;
  loansGross?: number;
  loanProvisions?: number;
  netLoan?: number;
  cashAndEquivalents?: number;
  totalAssets?: number;
  deposits?: number;
  totalEquity?: number;
  totalEquityAndLiabilities?: number;
  [key: string]: unknown;
}

export interface PraamsBankIncomeStatementRecord {
  date: string;
  period: string;
  isQuarter: boolean;
  interestIncome?: number;
  interestExpense?: number;
  netInterestIncome?: number;
  netProfit?: number;
  operatingExpenses?: number;
  [key: string]: unknown;
}

export interface PraamsBondAnalysis {
  asset: Record<string, unknown>;
  description?: Record<string, unknown>;
  profile?: Record<string, unknown>;
  scores?: Record<string, unknown>;
  keyFactors?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PraamsEquityAnalysis {
  asset: Record<string, unknown>;
  description?: Record<string, unknown>;
  profile?: Record<string, unknown>;
  scores?: Record<string, unknown>;
  keyFactors?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PraamsReportParams {
  email: string;
  isFull?: boolean;
}

export interface PraamsScreenerParams {
  skip?: number;
  take?: number;
}

export interface PraamsScreenerBody {
  mainRatioMin?: number;
  mainRatioMax?: number;
  regions?: string[];
  countries?: string[];
  sectors?: string[];
  industries?: string[];
  currency?: string[];
  orderBy?: string;
  [key: string]: unknown;
}

export interface PraamsScreenerResponse {
  success: boolean;
  message: string;
  errors: unknown[];
  item: {
    peers: Record<string, unknown>[];
    totalCount: number;
  };
}
