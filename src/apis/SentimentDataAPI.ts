import type { RequesterFn, SentimentDataParams, SentimentRecord } from "../types.js";

export class SentimentDataAPI {
  constructor(private readonly request: RequesterFn) {}

  async getSentimentData(params?: SentimentDataParams): Promise<SentimentRecord[] | Record<string, SentimentRecord> | string> {
    return this.request({ path: "/sentiments", params });
  }
}
