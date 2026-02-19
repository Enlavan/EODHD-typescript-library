import type { LiveExtendedQuote, LiveExtendedQuotesParams, RequesterFn } from "../types.js";

export class LiveExtendedQuotesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getLiveExtendedQuotes(ticker: string, params?: LiveExtendedQuotesParams): Promise<LiveExtendedQuote | string> {
    return this.request({ path: "/us-quote-delayed/{ticker}", pathParams: { ticker }, params });
  }
}
