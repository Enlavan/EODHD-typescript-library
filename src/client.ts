import { EODHD_AUX_BASE_URL, EODHD_BASE_URL } from "./constants.js";
import { EODHDConfigError, EODHDHttpError, EODHDTimeoutError } from "./errors.js";
import type {
  DividendRecord,
  EodBar,
  EconomicEvent,
  FundamentalsResponse,
  IntradayBar,
  MacroIndicatorRecord,
  NewsArticle,
  RealTimeQuote,
  ScreenerResult,
  SentimentRecord,
  SplitRecord,
  TickTrade
} from "./types.js";

export type QueryValue = string | number | boolean | Date | null | undefined | Array<string | number | boolean | Date>;

export interface RequestOptions {
  path: string;
  method?: "GET" | "POST";
  baseUrl?: string;
  pathParams?: Record<string, string | number>;
  params?: Record<string, QueryValue>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  responseType?: "json" | "text" | "arrayBuffer";
}

export interface EODHDClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
  defaultParams?: Record<string, QueryValue>;
  userAgent?: string;
}

export interface DateRangeParams {
  from?: string;
  to?: string;
}

export interface EodParams extends DateRangeParams {
  period?: "d" | "w" | "m";
  order?: "a" | "d";
  fmt?: "json" | "csv";
  filter?: "last_close" | "last_volume" | string;
}

export interface IntradayParams {
  interval?: "1m" | "5m" | "1h" | string;
  from?: number | string;
  to?: number | string;
  fmt?: "json" | "csv";
  "split-dt"?: 0 | 1;
}

export interface RealTimeParams {
  fmt?: "json" | "csv";
  s?: string | string[];
}

export interface FundamentalsParams {
  filter?: string;
  fmt?: "json" | "csv";
}

export interface DividendsParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface SplitsParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface TechnicalParams {
  function: string;
  period?: number;
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface NewsParams {
  s?: string | string[];
  t?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
  fmt?: "json" | "xml";
}

export interface SentimentParams extends DateRangeParams {
  s?: string | string[];
  fmt?: "json" | "csv";
}

export interface NewsWordWeightsParams extends DateRangeParams {
  s?: string | string[];
  limit?: number;
  fmt?: "json" | "csv";
}

export interface ScreenerParams {
  limit?: number;
  offset?: number;
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface MacroIndicatorParams {
  indicator: string;
  fmt?: "json" | "csv";
}

export interface CalendarParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface EconomicEventsParams extends DateRangeParams {
  fmt?: "json" | "csv";
}

export interface ExchangeSymbolsParams {
  fmt?: "json" | "csv";
}

export interface TickParams {
  from?: number | string;
  to?: number | string;
  limit?: number;
  fmt?: "json" | "csv";
}

export interface OptionsParams {
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface IndexComponentsParams {
  fmt?: "json" | "csv";
  [key: string]: QueryValue;
}

export interface CboeIndexParams {
  fmt?: "json" | "xml";
  "filter[index_code]": string;
  "filter[feed_type]": string;
  "filter[date]": string;
}

export interface CboeIndicesListParams {
  fmt?: "json" | "xml";
}

export class EODHDClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: typeof fetch;
  private readonly defaultParams: Record<string, QueryValue>;
  private readonly userAgent?: string;

  constructor(options: EODHDClientOptions) {
    if (!options?.apiKey) {
      throw new EODHDConfigError("apiKey is required to create an EODHDClient");
    }

    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? EODHD_BASE_URL;
    this.timeoutMs = options.timeoutMs ?? 30000;
    this.fetchImpl = options.fetch;
    this.defaultParams = options.defaultParams ?? {};
    this.userAgent = options.userAgent;
  }

  async request<T>(options: RequestOptions): Promise<T> {
    const method = options.method ?? "GET";
    const baseUrl = options.baseUrl ?? this.baseUrl;
    const { url, responseType } = this.buildUrl({
      baseUrl,
      path: options.path,
      pathParams: options.pathParams,
      params: options.params,
      responseType: options.responseType
    });

    const fetchImpl = this.fetchImpl ?? globalThis.fetch;
    if (!fetchImpl) {
      throw new EODHDConfigError("Fetch API is not available. Provide a fetch implementation.");
    }

    const { signal, cleanup } = this.createAbortSignal(options.signal);

    const headers: Record<string, string> = { ...options.headers };
    if (this.userAgent && !headers["User-Agent"]) {
      headers["User-Agent"] = this.userAgent;
    }

    try {
      const response = await fetchImpl(url, { method, headers, signal });
      if (!response.ok) {
        const body = await this.safeReadBody(response);
        throw new EODHDHttpError({
          status: response.status,
          statusText: response.statusText,
          url,
          body
        });
      }

      if (responseType === "text") {
        return (await response.text()) as T;
      }

      if (responseType === "arrayBuffer") {
        return (await response.arrayBuffer()) as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new EODHDTimeoutError("Request timed out");
      }
      throw error;
    } finally {
      cleanup();
    }
  }

  async getEod(ticker: string, params?: EodParams): Promise<EodBar[] | number | string> {
    return this.request({
      path: "/eod/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getIntraday(ticker: string, params?: IntradayParams): Promise<IntradayBar[] | string> {
    return this.request({
      path: "/intraday/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getRealTime(ticker: string, params?: RealTimeParams): Promise<RealTimeQuote | RealTimeQuote[] | string> {
    return this.request({
      path: "/real-time/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getFundamentals(ticker: string, params?: FundamentalsParams): Promise<FundamentalsResponse | string> {
    return this.request({
      path: "/fundamentals/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getDividends(ticker: string, params?: DividendsParams): Promise<DividendRecord[] | string> {
    return this.request({
      path: "/div/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getSplits(ticker: string, params?: SplitsParams): Promise<SplitRecord[] | string> {
    return this.request({
      path: "/splits/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getHistoricalMarketCap(ticker: string, params?: DateRangeParams & { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/historical-market-cap/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getTechnical(ticker: string, params: TechnicalParams): Promise<unknown> {
    return this.request({
      path: "/technical/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getTicks(ticker: string, params?: TickParams): Promise<TickTrade[] | string> {
    return this.request({
      path: "/ticks/{ticker}",
      pathParams: { ticker },
      params
    });
  }

  async getExchangeList(params?: { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/exchanges-list",
      params
    });
  }

  async getExchangeDetails(exchangeCode: string, params?: { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/exchange-details/{exchangeCode}",
      pathParams: { exchangeCode },
      params
    });
  }

  async getExchangeSymbols(exchangeCode: string, params?: ExchangeSymbolsParams): Promise<unknown> {
    return this.request({
      path: "/exchange-symbol-list/{exchangeCode}",
      pathParams: { exchangeCode },
      params
    });
  }

  async getEconomicEvents(params?: EconomicEventsParams): Promise<EconomicEvent[] | string> {
    return this.request({
      path: "/economic-events",
      params
    });
  }

  async getCalendarEarnings(params?: CalendarParams): Promise<unknown> {
    return this.request({
      path: "/calendar/earnings",
      params
    });
  }

  async getCalendarIpos(params?: CalendarParams): Promise<unknown> {
    return this.request({
      path: "/calendar/ipos",
      params
    });
  }

  async getCalendarSplits(params?: CalendarParams): Promise<unknown> {
    return this.request({
      path: "/calendar/splits",
      params
    });
  }

  async getEarningsTrends(params?: CalendarParams): Promise<unknown> {
    return this.request({
      path: "/calendar/trends",
      params
    });
  }

  async getMacroIndicator(country: string, params: MacroIndicatorParams): Promise<MacroIndicatorRecord[] | string> {
    return this.request({
      path: "/macro-indicator/{country}",
      pathParams: { country },
      params
    });
  }

  async getNews(params: NewsParams): Promise<NewsArticle[] | string> {
    return this.request({
      path: "/news",
      params
    });
  }

  async getSentiments(params: SentimentParams): Promise<SentimentRecord[] | string> {
    return this.request({
      path: "/sentiments",
      params
    });
  }

  async getNewsWordWeights(params: NewsWordWeightsParams): Promise<unknown> {
    return this.request({
      baseUrl: EODHD_AUX_BASE_URL,
      path: "/news-word-weights",
      params
    });
  }

  async getInsiderTransactions(params: { s?: string | string[]; from?: string; to?: string; limit?: number; fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      baseUrl: EODHD_AUX_BASE_URL,
      path: "/insider-transactions",
      params
    });
  }

  async getScreener(params?: ScreenerParams): Promise<ScreenerResult | string> {
    return this.request({
      path: "/screener",
      params
    });
  }

  async searchSymbols(query: string, params?: { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/search/{query}",
      pathParams: { query },
      params
    });
  }

  async getSymbolChangeHistory(params?: { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/symbol-change-history",
      params
    });
  }

  async getOptionsContracts(params?: OptionsParams): Promise<unknown> {
    return this.request({
      path: "/mp/unicornbay/options/contracts",
      params
    });
  }

  async getOptionsEod(params?: OptionsParams): Promise<unknown> {
    return this.request({
      path: "/mp/unicornbay/options/eod",
      params
    });
  }

  async getOptionsUnderlyings(params?: OptionsParams): Promise<unknown> {
    return this.request({
      path: "/mp/unicornbay/options/underlying-symbols",
      params
    });
  }

  async getIndicesList(params?: { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/mp/unicornbay/spglobal/list",
      params
    });
  }

  async getIndexComponents(symbol: string, params?: IndexComponentsParams): Promise<unknown> {
    return this.request({
      path: "/mp/unicornbay/spglobal/comp/{symbol}",
      pathParams: { symbol },
      params
    });
  }

  async getCboeIndicesList(params?: CboeIndicesListParams): Promise<unknown> {
    return this.request({
      path: "/cboe/indices",
      params
    });
  }

  async getCboeIndexData(params: CboeIndexParams): Promise<unknown> {
    return this.request({
      path: "/cboe/index",
      params
    });
  }

  async getBulkEodLastDay(exchange: string, params?: { fmt?: "json" | "csv" }): Promise<unknown> {
    return this.request({
      path: "/eod-bulk-last-day/{exchange}",
      pathParams: { exchange },
      params
    });
  }

  async getInternalUser(): Promise<unknown> {
    return this.request({
      path: "/internal-user"
    });
  }

  async getLogo(symbol: string): Promise<ArrayBuffer> {
    return this.request({
      baseUrl: EODHD_AUX_BASE_URL,
      path: "/logo/{symbol}",
      pathParams: { symbol },
      responseType: "arrayBuffer"
    });
  }

  private buildUrl(options: {
    baseUrl: string;
    path: string;
    pathParams?: Record<string, string | number>;
    params?: Record<string, QueryValue>;
    responseType?: "json" | "text" | "arrayBuffer";
  }): { url: string; responseType: "json" | "text" | "arrayBuffer" } {
    const baseUrl = options.baseUrl.replace(/\/+$/, "");
    const path = options.path.startsWith("/") ? options.path : `/${options.path}`;
    const resolvedPath = path.replace(/\{([^}]+)\}/g, (_match, key) => {
      const value = options.pathParams?.[key];
      if (value === undefined || value === null) {
        throw new EODHDConfigError(`Missing path parameter: ${key}`);
      }
      return encodeURIComponent(String(value));
    });

    const url = new URL(`${baseUrl}${resolvedPath}`);
    const mergedParams: Record<string, QueryValue> = {
      ...this.defaultParams,
      ...options.params
    };

    mergedParams.api_token = this.apiKey;

    Object.entries(mergedParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        const joined = value.map((item) => this.formatQueryValue(item)).join(",");
        if (joined.length > 0) {
          url.searchParams.set(key, joined);
        }
        return;
      }
      url.searchParams.set(key, this.formatQueryValue(value));
    });

    const responseType = options.responseType ?? this.inferResponseType(options.params);

    return { url: url.toString(), responseType };
  }

  private formatQueryValue(value: string | number | boolean | Date): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "boolean") {
      return value ? "1" : "0";
    }
    return String(value);
  }

  private inferResponseType(params?: Record<string, QueryValue>): "json" | "text" | "arrayBuffer" {
    const fmt = params?.fmt;
    if (fmt === "csv" || fmt === "xml") {
      return "text";
    }
    return "json";
  }

  private createAbortSignal(signal?: AbortSignal): { signal: AbortSignal; cleanup: () => void } {
    const controller = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (this.timeoutMs > 0) {
      timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
    }

    if (signal) {
      if (signal.aborted) {
        controller.abort();
      } else {
        signal.addEventListener("abort", () => controller.abort(), { once: true });
      }
    }

    return {
      signal: controller.signal,
      cleanup: () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    };
  }

  private async safeReadBody(response: Response): Promise<string | undefined> {
    try {
      return await response.text();
    } catch {
      return undefined;
    }
  }
}
