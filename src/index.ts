// Main client
export { EODHDClient } from "./client.js";

// Base class (for advanced usage / custom API modules)
export { BaseClient } from "./base.js";

// Individual API modules (74 modules)
export {
  BulkEodAPI,
  BulkFundamentalsAPI,
  CboeIndexDataAPI,
  CboeIndicesListAPI,
  EarningsTrendsAPI,
  EconomicEventsAPI,
  EodHistoricalDataAPI,
  ExchangeDetailsAPI,
  ExchangeTickersAPI,
  ExchangesListAPI,
  FinancialNewsAPI,
  FundamentalsAPI,
  HistoricalDividendsAPI,
  HistoricalMarketCapAPI,
  HistoricalSplitsAPI,
  IllioBestWorstAPI,
  IllioBetaBandsAPI,
  IllioLargestVolatilityAPI,
  IllioPerformanceInsightsAPI,
  IllioPerformanceVsMarketAPI,
  IllioRiskInsightsAPI,
  IllioRiskReturnAPI,
  IllioVolatilityBandsAPI,
  IndexComponentsAPI,
  IndicesListAPI,
  InsiderTransactionsAPI,
  IntradayDataAPI,
  InvestverteListCompaniesAPI,
  InvestverteListCountriesAPI,
  InvestverteListSectorsAPI,
  InvestverteViewCompanyAPI,
  InvestverteViewCountryAPI,
  InvestverteViewSectorAPI,
  LiveExtendedQuotesAPI,
  LiveStockPricesAPI,
  LogoAPI,
  LogoSvgAPI,
  MacroIndicatorsAPI,
  MarketplaceTickDataAPI,
  NewsWordWeightsAPI,
  OptionsContractsAPI,
  OptionsEodAPI,
  OptionsUnderlyingsAPI,
  PraamsBankBalanceSheetByIsinAPI,
  PraamsBankBalanceSheetByTickerAPI,
  PraamsBankIncomeStatementByIsinAPI,
  PraamsBankIncomeStatementByTickerAPI,
  PraamsBondAnalyzeByIsinAPI,
  PraamsReportBondByIsinAPI,
  PraamsReportEquityByIsinAPI,
  PraamsReportEquityByTickerAPI,
  PraamsRiskScoringByIsinAPI,
  PraamsRiskScoringByTickerAPI,
  PraamsSmartScreenerBondAPI,
  PraamsSmartScreenerEquityAPI,
  SearchAPI,
  SentimentDataAPI,
  StockScreenerAPI,
  SymbolChangeHistoryAPI,
  TechnicalIndicatorAPI,
  TickDataAPI,
  TradingHoursListMarketsAPI,
  TradingHoursLookupMarketsAPI,
  TradingHoursMarketDetailsAPI,
  TradingHoursMarketStatusAPI,
  USTBillRatesAPI,
  USTLongTermRatesAPI,
  USTRealYieldRatesAPI,
  USTYieldRatesAPI,
  UpcomingDividendsAPI,
  UpcomingEarningsAPI,
  UpcomingIPOsAPI,
  UpcomingSplitsAPI,
  UserAPI,
} from "./apis/index.js";

// Constants
export * from "./constants.js";

// Errors
export * from "./errors.js";

// Types
export type {
  // Client & request
  EODHDClientOptions,
  QueryValue,
  RequestOptions,
  RequesterFn,
  DateRangeParams,
  FmtJsonCsvParams,
  DateString,

  // EOD Historical Data
  EodParams,
  EodBar,

  // Intraday Data
  IntradayParams,
  IntradayBar,

  // Live Stock Prices
  LiveStockPricesParams,
  RealTimeQuote,

  // Live Extended Quotes
  LiveExtendedQuotesParams,
  LiveExtendedQuote,

  // Technical Indicators
  TechnicalParams,
  TechnicalRecord,

  // Historical Market Cap
  HistoricalMarketCapParams,
  HistoricalMarketCapRecord,

  // Tick Data
  TickParams,
  TickTrade,

  // Fundamentals
  FundamentalsParams,
  FundamentalsResponse,

  // Bulk Fundamentals
  BulkFundamentalsParams,

  // Historical Dividends
  HistoricalDividendsParams,
  DividendRecord,

  // Historical Splits
  HistoricalSplitsParams,
  SplitRecord,

  // Upcoming Earnings
  UpcomingEarningsParams,
  UpcomingEarningsResponse,
  CalendarEarning,

  // Upcoming IPOs
  UpcomingIposParams,
  UpcomingIposResponse,
  CalendarIpo,

  // Upcoming Splits
  UpcomingSplitsParams,
  UpcomingSplitsResponse,
  CalendarSplitRecord,

  // Upcoming Dividends
  UpcomingDividendsParams,
  UpcomingDividendsResponse,
  UpcomingDividendRecord,

  // Earnings Trends
  EarningsTrendsParams,
  EarningsTrend,

  // Exchanges List
  ExchangesListParams,
  ExchangeInfo,

  // Exchange Details
  ExchangeDetailsParams,
  ExchangeDetails,

  // Exchange Tickers
  ExchangeTickersParams,
  ExchangeSymbol,

  // Search
  SearchParams,
  SearchResult,

  // Symbol Change History
  SymbolChangeHistoryParams,
  SymbolChange,

  // Financial News
  FinancialNewsParams,
  NewsArticle,

  // Sentiment Data
  SentimentDataParams,
  SentimentRecord,

  // News Word Weights
  NewsWordWeightsParams,

  // Insider Transactions
  InsiderTransactionsParams,
  InsiderTransaction,

  // Macro Indicators
  MacroIndicatorParams,
  MacroIndicatorRecord,

  // Economic Events
  EconomicEventsParams,
  EconomicEvent,

  // Stock Screener
  StockScreenerParams,
  StockScreenerResponse,
  StockScreenerRecord,

  // Options Contracts
  OptionsContractsParams,
  OptionsContract,

  // Options EOD
  OptionsEodParams,
  OptionsEodRecord,

  // Options Underlyings
  OptionsUnderlyingsParams,

  // Indices List
  IndicesListParams,
  IndexInfo,

  // Index Components
  IndexComponentsParams,
  IndexComponent,

  // CBOE Indices List
  CboeIndicesListParams,
  CboeIndex,

  // CBOE Index Data
  CboeIndexDataParams,

  // Bulk EOD
  BulkEodParams,
  BulkEodRecord,

  // User
  UserInfo,

  // US Treasury Rates
  USTRatesParams,
  USTBillRate,
  USTLongTermRate,
  USTYieldRate,
  USTRealYieldRate,
  USTPaginatedResponse,

  // TradingHours
  TradingHoursListParams,
  TradingHoursLookupParams,
  TradingHoursMarketDetailsParams,
  TradingHoursMarketStatusParams,
  TradingHoursMarket,
  TradingHoursMarketDetail,
  TradingHoursMarketStatus,

  // Marketplace Tick Data
  MarketplaceTickDataParams,
  MarketplaceTickDataResponse,

  // Illio
  IllioIndexId,
  IllioChapterInsight,
  IllioCategoryInsight,

  // Investverte ESG
  InvestverteCompany,
  InvestverteCountry,
  InvestverteSector,
  InvestverteEsgViewParams,
  InvestverteEsgScore,
  InvestverteCountryView,
  InvestverteSectorView,

  // PRAAMS
  PraamsResponse,
  PraamsBankBalanceSheetRecord,
  PraamsBankIncomeStatementRecord,
  PraamsBondAnalysis,
  PraamsEquityAnalysis,
  PraamsReportParams,
  PraamsScreenerParams,
  PraamsScreenerBody,
  PraamsScreenerResponse,
} from "./types.js";
