import type { FinancialNewsParams, NewsArticle, RequesterFn } from "../types.js";

export class FinancialNewsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getFinancialNews(params?: FinancialNewsParams): Promise<NewsArticle[] | string> {
    return this.request({ path: "/news", params });
  }
}
