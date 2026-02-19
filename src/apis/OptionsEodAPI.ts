import type { OptionsEodParams, OptionsEodRecord, RequesterFn } from "../types.js";

export class OptionsEodAPI {
  constructor(private readonly request: RequesterFn) {}

  async getOptionsEod(params?: OptionsEodParams): Promise<OptionsEodRecord[] | Record<string, unknown> | string> {
    return this.request({ path: "/mp/unicornbay/options/eod", params });
  }
}
