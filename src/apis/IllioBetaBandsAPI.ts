import type { IllioChapterInsight, RequesterFn } from "../types.js";

export class IllioBetaBandsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioBetaBands(indexId: string): Promise<IllioChapterInsight> {
    return this.request({ path: "/mp/illio/chapters/beta-bands/{indexId}", pathParams: { indexId } });
  }
}
