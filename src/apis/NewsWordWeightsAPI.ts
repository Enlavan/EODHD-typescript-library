import { EODHD_AUX_BASE_URL } from "../constants.js";
import type { NewsWordWeightsParams, RequesterFn } from "../types.js";

export class NewsWordWeightsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getNewsWordWeights(params?: NewsWordWeightsParams): Promise<Record<string, unknown>[] | string> {
    return this.request({ baseUrl: EODHD_AUX_BASE_URL, path: "/news-word-weights", params });
  }
}
