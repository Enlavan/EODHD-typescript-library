import type { OptionsContract, OptionsContractsParams, RequesterFn } from "../types.js";

export class OptionsContractsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getOptionsContracts(params?: OptionsContractsParams): Promise<OptionsContract[] | Record<string, unknown> | string> {
    return this.request({ path: "/mp/unicornbay/options/contracts", params });
  }
}
