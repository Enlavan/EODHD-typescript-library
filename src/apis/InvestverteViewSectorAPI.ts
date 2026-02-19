import type { InvestverteSectorView, RequesterFn } from "../types.js";

export class InvestverteViewSectorAPI {
  constructor(private readonly request: RequesterFn) {}

  async getInvestverteViewSector(symbol: string): Promise<InvestverteSectorView> {
    return this.request({ path: "/mp/investverte/sector/{symbol}", pathParams: { symbol } });
  }
}
