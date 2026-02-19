import type { RequesterFn, SymbolChange, SymbolChangeHistoryParams } from "../types.js";

export class SymbolChangeHistoryAPI {
  constructor(private readonly request: RequesterFn) {}

  async getSymbolChangeHistory(params?: SymbolChangeHistoryParams): Promise<SymbolChange[] | string> {
    return this.request({ path: "/symbol-change-history", params });
  }
}
