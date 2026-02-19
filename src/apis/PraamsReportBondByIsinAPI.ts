import type { PraamsReportParams, RequesterFn } from "../types.js";

export class PraamsReportBondByIsinAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsReportBondByIsin(isin: string, params: PraamsReportParams): Promise<ArrayBuffer> {
    return this.request({ path: "/mp/praams/reports/bond/{isin}", pathParams: { isin }, params, responseType: "arrayBuffer" });
  }
}
