import type { IndexInfo, IndicesListParams, RequesterFn } from "../types.js";

export class IndicesListAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIndicesList(params?: IndicesListParams): Promise<IndexInfo[] | string> {
    return this.request({ path: "/mp/unicornbay/spglobal/list", params });
  }
}
