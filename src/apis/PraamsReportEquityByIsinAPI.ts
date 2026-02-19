import type { PraamsReportParams, RequesterFn } from "../types.js";

export class PraamsReportEquityByIsinAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsReportEquityByIsin(isin: string, params: PraamsReportParams): Promise<ArrayBuffer> {
    return this.request({ path: "/mp/praams/reports/equity/isin/{isin}", pathParams: { isin }, params, responseType: "arrayBuffer" });
  }
}
