import type {
  MacroIndicatorParams,
  MacroIndicatorRecord,
  RequesterFn,
} from "../types.js";

/**
 * Macroeconomic indicators by country.
 *
 * Endpoint: `/macro-indicator/{country}`
 *
 * @see https://eodhd.com/financial-apis/macroeconomics-data-and-macro-indicators-api
 */
export class MacroIndicatorsAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve macroeconomic indicator values for a country.
   *
   * @param country - ISO 3166-1 alpha-3 country code, e.g. `"USA"`.
   * @param params - Must include `indicator` name.
   */
  async getMacroIndicator(
    country: string,
    params: MacroIndicatorParams,
  ): Promise<MacroIndicatorRecord[] | string> {
    return this.request({
      path: "/macro-indicator/{country}",
      pathParams: { country },
      params,
    });
  }
}
