import type { InvestverteSector, RequesterFn } from "../types.js";

export class InvestverteListSectorsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getInvestverteListSectors(): Promise<InvestverteSector[]> {
    return this.request({ path: "/mp/investverte/sectors" });
  }
}
