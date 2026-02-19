import type { OptionsUnderlyingsParams, RequesterFn } from "../types.js";

export class OptionsUnderlyingsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getOptionsUnderlyings(params?: OptionsUnderlyingsParams): Promise<string[] | Record<string, unknown> | string> {
    return this.request({ path: "/mp/unicornbay/options/underlying-symbols", params });
  }
}
