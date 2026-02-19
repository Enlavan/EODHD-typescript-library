import type { RequesterFn, SearchParams, SearchResult } from "../types.js";

export class SearchAPI {
  constructor(private readonly request: RequesterFn) {}

  async searchSymbols(query: string, params?: SearchParams): Promise<SearchResult[] | string> {
    return this.request({ path: "/search/{query}", pathParams: { query }, params });
  }
}
