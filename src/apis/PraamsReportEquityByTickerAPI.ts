import type { PraamsReportParams, RequesterFn } from "../types.js";

export class PraamsReportEquityByTickerAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsReportEquityByTicker(ticker: string, params: PraamsReportParams): Promise<ArrayBuffer> {
    return this.request({ path: "/mp/praams/reports/equity/ticker/{ticker}", pathParams: { ticker }, params, responseType: "arrayBuffer" });
  }
}
