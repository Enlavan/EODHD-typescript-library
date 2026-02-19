import type { RequesterFn, UserInfo } from "../types.js";

/**
 * User account information.
 *
 * Endpoint: `/user`
 *
 * @see https://eodhd.com/financial-apis/user-api
 */
export class UserAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve the authenticated user's account details and API usage.
   */
  async getUser(): Promise<UserInfo> {
    return this.request({
      path: "/user",
    });
  }
}
