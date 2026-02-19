import {
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
import { BaseClient } from "./base.js";
import type {
  BulkEodParams,
  BulkEodRecord,
  BulkFundamentalsParams,
  CalendarEarning,
  CalendarIpo,
  CalendarSplitRecord,
  CboeIndex,
  CboeIndexDataParams,
  CboeIndicesListParams,
  DividendRecord,
  EarningsTrend,
  EarningsTrendsParams,
  EconomicEvent,
  EconomicEventsParams,
  EODHDClientOptions,
  EodBar,
  EodParams,
  ExchangeDetails,
  ExchangeDetailsParams,
  ExchangeInfo,
  ExchangeSymbol,
  ExchangeTickersParams,
  ExchangesListParams,
  FinancialNewsParams,
  FundamentalsParams,
  FundamentalsResponse,
  HistoricalDividendsParams,
  HistoricalMarketCapParams,
  HistoricalMarketCapRecord,
  HistoricalSplitsParams,
  IllioCategoryInsight,
  IllioChapterInsight,
  IndexComponent,
  IndexComponentsParams,
  IndexInfo,
  IndicesListParams,
  InsiderTransaction,
  InsiderTransactionsParams,
  IntradayBar,
  IntradayParams,
  InvestverteCompany,
  InvestverteCountry,
  InvestverteCountryView,
  InvestverteEsgScore,
  InvestverteEsgViewParams,
  InvestverteSector,
  InvestverteSectorView,
  LiveExtendedQuote,
  LiveExtendedQuotesParams,
  LiveStockPricesParams,
  MacroIndicatorParams,
  MacroIndicatorRecord,
  MarketplaceTickDataParams,
  MarketplaceTickDataResponse,
  NewsArticle,
  NewsWordWeightsParams,
  OptionsContract,
  OptionsContractsParams,
  OptionsEodParams,
  OptionsEodRecord,
  OptionsUnderlyingsParams,
  PraamsBankBalanceSheetRecord,
  PraamsBankIncomeStatementRecord,
  PraamsBondAnalysis,
  PraamsEquityAnalysis,
  PraamsReportParams,
  PraamsResponse,
  PraamsScreenerBody,
  PraamsScreenerParams,
  PraamsScreenerResponse,
  RealTimeQuote,
  SearchParams,
  SearchResult,
  SentimentDataParams,
  SentimentRecord,
  SplitRecord,
  StockScreenerParams,
  StockScreenerResponse,
  SymbolChange,
  SymbolChangeHistoryParams,
  TechnicalParams,
  TechnicalRecord,
  TickParams,
  TickTrade,
  TradingHoursListParams,
  TradingHoursLookupParams,
  TradingHoursMarket,
  TradingHoursMarketDetail,
  TradingHoursMarketDetailsParams,
  TradingHoursMarketStatus,
  TradingHoursMarketStatusParams,
  UpcomingDividendsParams,
  UpcomingDividendsResponse,
  UpcomingEarningsParams,
  UpcomingEarningsResponse,
  UpcomingIposParams,
  UpcomingIposResponse,
  UpcomingSplitsParams,
  UpcomingSplitsResponse,
  USTBillRate,
  USTLongTermRate,
  USTPaginatedResponse,
  USTRatesParams,
  USTRealYieldRate,
  USTYieldRate,
  UserInfo,
} from "./types.js";

/**
 * Full-featured EODHD API client.
 *
 * Provides two complementary access patterns:
 *
 * 1. **Modular** – access individual API modules as properties:
 *    ```ts
 *    client.eodHistoricalData.getEod("AAPL.US");
 *    client.financialNews.getFinancialNews({ s: "AAPL.US" });
 *    ```
 *
 * 2. **Flat** – call convenience methods directly on the client:
 *    ```ts
 *    client.getEod("AAPL.US");
 *    client.getFinancialNews({ s: "AAPL.US" });
 *    ```
 *
 * Both patterns produce identical results.
 */
export class EODHDClient extends BaseClient {
  // ----- API modules (public, read-only) ----------------------------------

  readonly eodHistoricalData: EodHistoricalDataAPI;
  readonly intradayData: IntradayDataAPI;
  readonly liveStockPrices: LiveStockPricesAPI;
  readonly liveExtendedQuotes: LiveExtendedQuotesAPI;
  readonly tickData: TickDataAPI;
  readonly technicalIndicator: TechnicalIndicatorAPI;
  readonly historicalMarketCap: HistoricalMarketCapAPI;
  readonly fundamentals: FundamentalsAPI;
  readonly bulkFundamentals: BulkFundamentalsAPI;
  readonly historicalDividends: HistoricalDividendsAPI;
  readonly historicalSplits: HistoricalSplitsAPI;
  readonly bulkEod: BulkEodAPI;
  readonly upcomingEarnings: UpcomingEarningsAPI;
  readonly upcomingIpos: UpcomingIPOsAPI;
  readonly upcomingSplits: UpcomingSplitsAPI;
  readonly upcomingDividends: UpcomingDividendsAPI;
  readonly earningsTrends: EarningsTrendsAPI;
  readonly exchangesList: ExchangesListAPI;
  readonly exchangeDetails: ExchangeDetailsAPI;
  readonly exchangeTickers: ExchangeTickersAPI;
  readonly search: SearchAPI;
  readonly symbolChangeHistory: SymbolChangeHistoryAPI;
  readonly financialNews: FinancialNewsAPI;
  readonly sentimentData: SentimentDataAPI;
  readonly newsWordWeights: NewsWordWeightsAPI;
  readonly insiderTransactions: InsiderTransactionsAPI;
  readonly macroIndicators: MacroIndicatorsAPI;
  readonly economicEvents: EconomicEventsAPI;
  readonly stockScreener: StockScreenerAPI;
  readonly optionsContracts: OptionsContractsAPI;
  readonly optionsEod: OptionsEodAPI;
  readonly optionsUnderlyings: OptionsUnderlyingsAPI;
  readonly indicesList: IndicesListAPI;
  readonly indexComponents: IndexComponentsAPI;
  readonly cboeIndicesList: CboeIndicesListAPI;
  readonly cboeIndexData: CboeIndexDataAPI;
  readonly logo: LogoAPI;
  readonly logoSvg: LogoSvgAPI;
  readonly user: UserAPI;
  readonly marketplaceTickData: MarketplaceTickDataAPI;
  readonly tradingHoursListMarkets: TradingHoursListMarketsAPI;
  readonly tradingHoursLookupMarkets: TradingHoursLookupMarketsAPI;
  readonly tradingHoursMarketDetails: TradingHoursMarketDetailsAPI;
  readonly tradingHoursMarketStatus: TradingHoursMarketStatusAPI;
  readonly ustBillRates: USTBillRatesAPI;
  readonly ustLongTermRates: USTLongTermRatesAPI;
  readonly ustYieldRates: USTYieldRatesAPI;
  readonly ustRealYieldRates: USTRealYieldRatesAPI;
  readonly illioBestWorst: IllioBestWorstAPI;
  readonly illioBetaBands: IllioBetaBandsAPI;
  readonly illioLargestVolatility: IllioLargestVolatilityAPI;
  readonly illioPerformanceInsights: IllioPerformanceInsightsAPI;
  readonly illioPerformanceVsMarket: IllioPerformanceVsMarketAPI;
  readonly illioRiskInsights: IllioRiskInsightsAPI;
  readonly illioRiskReturn: IllioRiskReturnAPI;
  readonly illioVolatilityBands: IllioVolatilityBandsAPI;
  readonly investverteListCompanies: InvestverteListCompaniesAPI;
  readonly investverteListCountries: InvestverteListCountriesAPI;
  readonly investverteListSectors: InvestverteListSectorsAPI;
  readonly investverteViewCompany: InvestverteViewCompanyAPI;
  readonly investverteViewCountry: InvestverteViewCountryAPI;
  readonly investverteViewSector: InvestverteViewSectorAPI;
  readonly praamsBankBalanceSheetByIsin: PraamsBankBalanceSheetByIsinAPI;
  readonly praamsBankBalanceSheetByTicker: PraamsBankBalanceSheetByTickerAPI;
  readonly praamsBankIncomeStatementByIsin: PraamsBankIncomeStatementByIsinAPI;
  readonly praamsBankIncomeStatementByTicker: PraamsBankIncomeStatementByTickerAPI;
  readonly praamsBondAnalyzeByIsin: PraamsBondAnalyzeByIsinAPI;
  readonly praamsReportBondByIsin: PraamsReportBondByIsinAPI;
  readonly praamsReportEquityByIsin: PraamsReportEquityByIsinAPI;
  readonly praamsReportEquityByTicker: PraamsReportEquityByTickerAPI;
  readonly praamsRiskScoringByIsin: PraamsRiskScoringByIsinAPI;
  readonly praamsRiskScoringByTicker: PraamsRiskScoringByTickerAPI;
  readonly praamsSmartScreenerBond: PraamsSmartScreenerBondAPI;
  readonly praamsSmartScreenerEquity: PraamsSmartScreenerEquityAPI;

  constructor(options: EODHDClientOptions) {
    super(options);

    const req = this.request.bind(this);

    // Core market data
    this.eodHistoricalData = new EodHistoricalDataAPI(req);
    this.intradayData = new IntradayDataAPI(req);
    this.liveStockPrices = new LiveStockPricesAPI(req);
    this.liveExtendedQuotes = new LiveExtendedQuotesAPI(req);
    this.tickData = new TickDataAPI(req);
    this.technicalIndicator = new TechnicalIndicatorAPI(req);
    this.historicalMarketCap = new HistoricalMarketCapAPI(req);

    // Fundamentals
    this.fundamentals = new FundamentalsAPI(req);
    this.bulkFundamentals = new BulkFundamentalsAPI(req);

    // Corporate actions
    this.historicalDividends = new HistoricalDividendsAPI(req);
    this.historicalSplits = new HistoricalSplitsAPI(req);

    // Bulk
    this.bulkEod = new BulkEodAPI(req);

    // Calendar
    this.upcomingEarnings = new UpcomingEarningsAPI(req);
    this.upcomingIpos = new UpcomingIPOsAPI(req);
    this.upcomingSplits = new UpcomingSplitsAPI(req);
    this.upcomingDividends = new UpcomingDividendsAPI(req);
    this.earningsTrends = new EarningsTrendsAPI(req);

    // Exchanges & search
    this.exchangesList = new ExchangesListAPI(req);
    this.exchangeDetails = new ExchangeDetailsAPI(req);
    this.exchangeTickers = new ExchangeTickersAPI(req);
    this.search = new SearchAPI(req);
    this.symbolChangeHistory = new SymbolChangeHistoryAPI(req);

    // News & sentiment
    this.financialNews = new FinancialNewsAPI(req);
    this.sentimentData = new SentimentDataAPI(req);
    this.newsWordWeights = new NewsWordWeightsAPI(req);

    // Insider transactions
    this.insiderTransactions = new InsiderTransactionsAPI(req);

    // Macro & economic
    this.macroIndicators = new MacroIndicatorsAPI(req);
    this.economicEvents = new EconomicEventsAPI(req);

    // Screener
    this.stockScreener = new StockScreenerAPI(req);

    // Options (Marketplace)
    this.optionsContracts = new OptionsContractsAPI(req);
    this.optionsEod = new OptionsEodAPI(req);
    this.optionsUnderlyings = new OptionsUnderlyingsAPI(req);

    // S&P Global indices (Marketplace)
    this.indicesList = new IndicesListAPI(req);
    this.indexComponents = new IndexComponentsAPI(req);

    // CBOE
    this.cboeIndicesList = new CboeIndicesListAPI(req);
    this.cboeIndexData = new CboeIndexDataAPI(req);

    // Logos
    this.logo = new LogoAPI(req);
    this.logoSvg = new LogoSvgAPI(req);

    // User
    this.user = new UserAPI(req);

    // Marketplace tick data
    this.marketplaceTickData = new MarketplaceTickDataAPI(req);

    // TradingHours (Marketplace)
    this.tradingHoursListMarkets = new TradingHoursListMarketsAPI(req);
    this.tradingHoursLookupMarkets = new TradingHoursLookupMarketsAPI(req);
    this.tradingHoursMarketDetails = new TradingHoursMarketDetailsAPI(req);
    this.tradingHoursMarketStatus = new TradingHoursMarketStatusAPI(req);

    // US Treasury rates
    this.ustBillRates = new USTBillRatesAPI(req);
    this.ustLongTermRates = new USTLongTermRatesAPI(req);
    this.ustYieldRates = new USTYieldRatesAPI(req);
    this.ustRealYieldRates = new USTRealYieldRatesAPI(req);

    // Illio market insights (Marketplace)
    this.illioBestWorst = new IllioBestWorstAPI(req);
    this.illioBetaBands = new IllioBetaBandsAPI(req);
    this.illioLargestVolatility = new IllioLargestVolatilityAPI(req);
    this.illioPerformanceInsights = new IllioPerformanceInsightsAPI(req);
    this.illioPerformanceVsMarket = new IllioPerformanceVsMarketAPI(req);
    this.illioRiskInsights = new IllioRiskInsightsAPI(req);
    this.illioRiskReturn = new IllioRiskReturnAPI(req);
    this.illioVolatilityBands = new IllioVolatilityBandsAPI(req);

    // Investverte ESG (Marketplace)
    this.investverteListCompanies = new InvestverteListCompaniesAPI(req);
    this.investverteListCountries = new InvestverteListCountriesAPI(req);
    this.investverteListSectors = new InvestverteListSectorsAPI(req);
    this.investverteViewCompany = new InvestverteViewCompanyAPI(req);
    this.investverteViewCountry = new InvestverteViewCountryAPI(req);
    this.investverteViewSector = new InvestverteViewSectorAPI(req);

    // PRAAMS (Marketplace)
    this.praamsBankBalanceSheetByIsin = new PraamsBankBalanceSheetByIsinAPI(req);
    this.praamsBankBalanceSheetByTicker = new PraamsBankBalanceSheetByTickerAPI(req);
    this.praamsBankIncomeStatementByIsin = new PraamsBankIncomeStatementByIsinAPI(req);
    this.praamsBankIncomeStatementByTicker = new PraamsBankIncomeStatementByTickerAPI(req);
    this.praamsBondAnalyzeByIsin = new PraamsBondAnalyzeByIsinAPI(req);
    this.praamsReportBondByIsin = new PraamsReportBondByIsinAPI(req);
    this.praamsReportEquityByIsin = new PraamsReportEquityByIsinAPI(req);
    this.praamsReportEquityByTicker = new PraamsReportEquityByTickerAPI(req);
    this.praamsRiskScoringByIsin = new PraamsRiskScoringByIsinAPI(req);
    this.praamsRiskScoringByTicker = new PraamsRiskScoringByTickerAPI(req);
    this.praamsSmartScreenerBond = new PraamsSmartScreenerBondAPI(req);
    this.praamsSmartScreenerEquity = new PraamsSmartScreenerEquityAPI(req);
  }

  // ----- Flat convenience methods (delegate to modules) -------------------

  // Core market data
  async getEod(ticker: string, params?: EodParams): Promise<EodBar[] | string> {
    return this.eodHistoricalData.getEod(ticker, params);
  }

  async getIntraday(ticker: string, params?: IntradayParams): Promise<IntradayBar[] | string> {
    return this.intradayData.getIntraday(ticker, params);
  }

  async getLiveStockPrices(ticker: string, params?: LiveStockPricesParams): Promise<RealTimeQuote | RealTimeQuote[] | string> {
    return this.liveStockPrices.getLiveStockPrices(ticker, params);
  }

  async getLiveExtendedQuotes(ticker: string, params?: LiveExtendedQuotesParams): Promise<LiveExtendedQuote | string> {
    return this.liveExtendedQuotes.getLiveExtendedQuotes(ticker, params);
  }

  async getTicks(ticker: string, params?: TickParams): Promise<TickTrade[] | string> {
    return this.tickData.getTicks(ticker, params);
  }

  async getTechnical(ticker: string, params: TechnicalParams): Promise<TechnicalRecord[] | string> {
    return this.technicalIndicator.getTechnical(ticker, params);
  }

  async getHistoricalMarketCap(ticker: string, params?: HistoricalMarketCapParams): Promise<HistoricalMarketCapRecord[] | string> {
    return this.historicalMarketCap.getHistoricalMarketCap(ticker, params);
  }

  // Fundamentals
  async getFundamentals(ticker: string, params?: FundamentalsParams): Promise<FundamentalsResponse | string> {
    return this.fundamentals.getFundamentals(ticker, params);
  }

  async getBulkFundamentals(exchange: string, params?: BulkFundamentalsParams): Promise<FundamentalsResponse[] | string> {
    return this.bulkFundamentals.getBulkFundamentals(exchange, params);
  }

  // Corporate actions
  async getHistoricalDividends(ticker: string, params?: HistoricalDividendsParams): Promise<DividendRecord[] | string> {
    return this.historicalDividends.getHistoricalDividends(ticker, params);
  }

  async getHistoricalSplits(ticker: string, params?: HistoricalSplitsParams): Promise<SplitRecord[] | string> {
    return this.historicalSplits.getHistoricalSplits(ticker, params);
  }

  // Bulk
  async getBulkEodLastDay(exchange: string, params?: BulkEodParams): Promise<BulkEodRecord[] | string> {
    return this.bulkEod.getBulkEodLastDay(exchange, params);
  }

  // Calendar
  async getUpcomingEarnings(params?: UpcomingEarningsParams): Promise<UpcomingEarningsResponse | CalendarEarning[] | string> {
    return this.upcomingEarnings.getUpcomingEarnings(params);
  }

  async getUpcomingIpos(params?: UpcomingIposParams): Promise<UpcomingIposResponse | CalendarIpo[] | string> {
    return this.upcomingIpos.getUpcomingIpos(params);
  }

  async getUpcomingSplits(params?: UpcomingSplitsParams): Promise<UpcomingSplitsResponse | CalendarSplitRecord[] | string> {
    return this.upcomingSplits.getUpcomingSplits(params);
  }

  async getUpcomingDividends(params?: UpcomingDividendsParams): Promise<UpcomingDividendsResponse | string> {
    return this.upcomingDividends.getUpcomingDividends(params);
  }

  async getEarningsTrends(params: EarningsTrendsParams): Promise<EarningsTrend[] | Record<string, EarningsTrend> | string> {
    return this.earningsTrends.getEarningsTrends(params);
  }

  // Exchanges & search
  async getExchangesList(params?: ExchangesListParams): Promise<ExchangeInfo[] | string> {
    return this.exchangesList.getExchangesList(params);
  }

  async getExchangeDetails(exchangeCode: string, params?: ExchangeDetailsParams): Promise<ExchangeDetails | string> {
    return this.exchangeDetails.getExchangeDetails(exchangeCode, params);
  }

  async getExchangeTickers(exchangeCode: string, params?: ExchangeTickersParams): Promise<ExchangeSymbol[] | string> {
    return this.exchangeTickers.getExchangeTickers(exchangeCode, params);
  }

  async searchSymbols(query: string, params?: SearchParams): Promise<SearchResult[] | string> {
    return this.search.searchSymbols(query, params);
  }

  async getSymbolChangeHistory(params?: SymbolChangeHistoryParams): Promise<SymbolChange[] | string> {
    return this.symbolChangeHistory.getSymbolChangeHistory(params);
  }

  // News & sentiment
  async getFinancialNews(params?: FinancialNewsParams): Promise<NewsArticle[] | string> {
    return this.financialNews.getFinancialNews(params);
  }

  async getSentimentData(params?: SentimentDataParams): Promise<SentimentRecord[] | Record<string, SentimentRecord> | string> {
    return this.sentimentData.getSentimentData(params);
  }

  async getNewsWordWeights(params?: NewsWordWeightsParams): Promise<Record<string, unknown>[] | string> {
    return this.newsWordWeights.getNewsWordWeights(params);
  }

  // Insider transactions
  async getInsiderTransactions(params?: InsiderTransactionsParams): Promise<InsiderTransaction[] | string> {
    return this.insiderTransactions.getInsiderTransactions(params);
  }

  // Macro & economic
  async getMacroIndicator(country: string, params: MacroIndicatorParams): Promise<MacroIndicatorRecord[] | string> {
    return this.macroIndicators.getMacroIndicator(country, params);
  }

  async getEconomicEvents(params?: EconomicEventsParams): Promise<EconomicEvent[] | string> {
    return this.economicEvents.getEconomicEvents(params);
  }

  // Screener
  async getStockScreener(params?: StockScreenerParams): Promise<StockScreenerResponse | string> {
    return this.stockScreener.getStockScreener(params);
  }

  // Options
  async getOptionsContracts(params?: OptionsContractsParams): Promise<OptionsContract[] | Record<string, unknown> | string> {
    return this.optionsContracts.getOptionsContracts(params);
  }

  async getOptionsEod(params?: OptionsEodParams): Promise<OptionsEodRecord[] | Record<string, unknown> | string> {
    return this.optionsEod.getOptionsEod(params);
  }

  async getOptionsUnderlyings(params?: OptionsUnderlyingsParams): Promise<string[] | Record<string, unknown> | string> {
    return this.optionsUnderlyings.getOptionsUnderlyings(params);
  }

  // Indices
  async getIndicesList(params?: IndicesListParams): Promise<IndexInfo[] | string> {
    return this.indicesList.getIndicesList(params);
  }

  async getIndexComponents(symbol: string, params?: IndexComponentsParams): Promise<IndexComponent[] | Record<string, unknown> | string> {
    return this.indexComponents.getIndexComponents(symbol, params);
  }

  // CBOE
  async getCboeIndicesList(params?: CboeIndicesListParams): Promise<CboeIndex[] | string> {
    return this.cboeIndicesList.getCboeIndicesList(params);
  }

  async getCboeIndexData(params: CboeIndexDataParams): Promise<CboeIndex[] | string> {
    return this.cboeIndexData.getCboeIndexData(params);
  }

  // Logos
  async getLogo(symbol: string): Promise<ArrayBuffer> {
    return this.logo.getLogo(symbol);
  }

  async getLogoSvg(symbol: string): Promise<string> {
    return this.logoSvg.getLogoSvg(symbol);
  }

  // User
  async getUser(): Promise<UserInfo> {
    return this.user.getUser();
  }

  // Marketplace tick data
  async getMarketplaceTickData(params: MarketplaceTickDataParams): Promise<MarketplaceTickDataResponse> {
    return this.marketplaceTickData.getMarketplaceTickData(params);
  }

  // TradingHours
  async getTradingHoursListMarkets(params?: TradingHoursListParams): Promise<TradingHoursMarket[]> {
    return this.tradingHoursListMarkets.getTradingHoursListMarkets(params);
  }

  async getTradingHoursLookupMarkets(params?: TradingHoursLookupParams): Promise<TradingHoursMarket[]> {
    return this.tradingHoursLookupMarkets.getTradingHoursLookupMarkets(params);
  }

  async getTradingHoursMarketDetails(params: TradingHoursMarketDetailsParams): Promise<TradingHoursMarketDetail[]> {
    return this.tradingHoursMarketDetails.getTradingHoursMarketDetails(params);
  }

  async getTradingHoursMarketStatus(params: TradingHoursMarketStatusParams): Promise<Record<string, TradingHoursMarketStatus>> {
    return this.tradingHoursMarketStatus.getTradingHoursMarketStatus(params);
  }

  // US Treasury rates
  async getUSTBillRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTBillRate>> {
    return this.ustBillRates.getUSTBillRates(params);
  }

  async getUSTLongTermRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTLongTermRate>> {
    return this.ustLongTermRates.getUSTLongTermRates(params);
  }

  async getUSTYieldRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTYieldRate>> {
    return this.ustYieldRates.getUSTYieldRates(params);
  }

  async getUSTRealYieldRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTRealYieldRate>> {
    return this.ustRealYieldRates.getUSTRealYieldRates(params);
  }

  // Illio
  async getIllioBestWorst(indexId: string): Promise<IllioChapterInsight> {
    return this.illioBestWorst.getIllioBestWorst(indexId);
  }

  async getIllioBetaBands(indexId: string): Promise<IllioChapterInsight> {
    return this.illioBetaBands.getIllioBetaBands(indexId);
  }

  async getIllioLargestVolatility(indexId: string): Promise<IllioChapterInsight> {
    return this.illioLargestVolatility.getIllioLargestVolatility(indexId);
  }

  async getIllioPerformanceInsights(indexId: string): Promise<IllioCategoryInsight> {
    return this.illioPerformanceInsights.getIllioPerformanceInsights(indexId);
  }

  async getIllioPerformanceVsMarket(indexId: string): Promise<IllioChapterInsight> {
    return this.illioPerformanceVsMarket.getIllioPerformanceVsMarket(indexId);
  }

  async getIllioRiskInsights(indexId: string): Promise<IllioCategoryInsight> {
    return this.illioRiskInsights.getIllioRiskInsights(indexId);
  }

  async getIllioRiskReturn(indexId: string): Promise<IllioChapterInsight> {
    return this.illioRiskReturn.getIllioRiskReturn(indexId);
  }

  async getIllioVolatilityBands(indexId: string): Promise<IllioChapterInsight> {
    return this.illioVolatilityBands.getIllioVolatilityBands(indexId);
  }

  // Investverte ESG
  async getInvestverteListCompanies(): Promise<InvestverteCompany[]> {
    return this.investverteListCompanies.getInvestverteListCompanies();
  }

  async getInvestverteListCountries(): Promise<InvestverteCountry[]> {
    return this.investverteListCountries.getInvestverteListCountries();
  }

  async getInvestverteListSectors(): Promise<InvestverteSector[]> {
    return this.investverteListSectors.getInvestverteListSectors();
  }

  async getInvestverteViewCompany(symbol: string, params?: InvestverteEsgViewParams): Promise<InvestverteEsgScore[]> {
    return this.investverteViewCompany.getInvestverteViewCompany(symbol, params);
  }

  async getInvestverteViewCountry(symbol: string, params?: InvestverteEsgViewParams): Promise<InvestverteCountryView[]> {
    return this.investverteViewCountry.getInvestverteViewCountry(symbol, params);
  }

  async getInvestverteViewSector(symbol: string): Promise<InvestverteSectorView> {
    return this.investverteViewSector.getInvestverteViewSector(symbol);
  }

  // PRAAMS
  async getPraamsBankBalanceSheetByIsin(isin: string): Promise<PraamsResponse<PraamsBankBalanceSheetRecord>> {
    return this.praamsBankBalanceSheetByIsin.getPraamsBankBalanceSheetByIsin(isin);
  }

  async getPraamsBankBalanceSheetByTicker(ticker: string): Promise<PraamsResponse<PraamsBankBalanceSheetRecord>> {
    return this.praamsBankBalanceSheetByTicker.getPraamsBankBalanceSheetByTicker(ticker);
  }

  async getPraamsBankIncomeStatementByIsin(isin: string): Promise<PraamsResponse<PraamsBankIncomeStatementRecord>> {
    return this.praamsBankIncomeStatementByIsin.getPraamsBankIncomeStatementByIsin(isin);
  }

  async getPraamsBankIncomeStatementByTicker(ticker: string): Promise<PraamsResponse<PraamsBankIncomeStatementRecord>> {
    return this.praamsBankIncomeStatementByTicker.getPraamsBankIncomeStatementByTicker(ticker);
  }

  async getPraamsBondAnalyzeByIsin(isin: string): Promise<PraamsResponse<PraamsBondAnalysis>> {
    return this.praamsBondAnalyzeByIsin.getPraamsBondAnalyzeByIsin(isin);
  }

  async getPraamsReportBondByIsin(isin: string, params: PraamsReportParams): Promise<ArrayBuffer> {
    return this.praamsReportBondByIsin.getPraamsReportBondByIsin(isin, params);
  }

  async getPraamsReportEquityByIsin(isin: string, params: PraamsReportParams): Promise<ArrayBuffer> {
    return this.praamsReportEquityByIsin.getPraamsReportEquityByIsin(isin, params);
  }

  async getPraamsReportEquityByTicker(ticker: string, params: PraamsReportParams): Promise<ArrayBuffer> {
    return this.praamsReportEquityByTicker.getPraamsReportEquityByTicker(ticker, params);
  }

  async getPraamsRiskScoringByIsin(isin: string): Promise<PraamsResponse<PraamsEquityAnalysis>> {
    return this.praamsRiskScoringByIsin.getPraamsRiskScoringByIsin(isin);
  }

  async getPraamsRiskScoringByTicker(ticker: string): Promise<PraamsResponse<PraamsEquityAnalysis>> {
    return this.praamsRiskScoringByTicker.getPraamsRiskScoringByTicker(ticker);
  }

  async getPraamsSmartScreenerBond(body: PraamsScreenerBody, params?: PraamsScreenerParams): Promise<PraamsScreenerResponse> {
    return this.praamsSmartScreenerBond.getPraamsSmartScreenerBond(body, params);
  }

  async getPraamsSmartScreenerEquity(body: PraamsScreenerBody, params?: PraamsScreenerParams): Promise<PraamsScreenerResponse> {
    return this.praamsSmartScreenerEquity.getPraamsSmartScreenerEquity(body, params);
  }
}
