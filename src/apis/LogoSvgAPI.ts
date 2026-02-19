import type { RequesterFn } from "../types.js";

export class LogoSvgAPI {
  constructor(private readonly request: RequesterFn) {}

  async getLogoSvg(symbol: string): Promise<string> {
    return this.request({ path: "/logo-svg/{symbol}", pathParams: { symbol }, responseType: "text" });
  }
}
