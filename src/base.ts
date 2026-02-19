import { EODHD_BASE_URL } from "./constants.js";
import { EODHDConfigError, EODHDHttpError, EODHDTimeoutError } from "./errors.js";
import type { EODHDClientOptions, QueryValue, RequestOptions } from "./types.js";

/**
 * Core HTTP infrastructure shared by all API modules.
 *
 * Handles URL building, authentication, timeouts, and response parsing.
 * API modules receive a bound {@link RequesterFn} from the client rather
 * than extending this class directly, which keeps modules lightweight and
 * easy to test in isolation.
 */
export class BaseClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: typeof fetch;
  private readonly defaultParams: Record<string, QueryValue>;
  private readonly userAgent?: string;

  constructor(options: EODHDClientOptions) {
    if (!options?.apiKey) {
      throw new EODHDConfigError("apiKey is required to create an EODHDClient");
    }

    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? EODHD_BASE_URL;
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.fetchImpl = options.fetch;
    this.defaultParams = options.defaultParams ?? {};
    this.userAgent = options.userAgent;
  }

  // -----------------------------------------------------------------------
  // Public requester – the single function every API module calls
  // -----------------------------------------------------------------------

  async request<T>(options: RequestOptions): Promise<T> {
    const method = options.method ?? "GET";
    const baseUrl = options.baseUrl ?? this.baseUrl;
    const { url, responseType } = this.buildUrl({
      baseUrl,
      path: options.path,
      pathParams: options.pathParams,
      params: options.params,
      responseType: options.responseType,
    });

    const fetchImpl = this.fetchImpl ?? globalThis.fetch;
    if (!fetchImpl) {
      throw new EODHDConfigError(
        "Fetch API is not available. Provide a fetch implementation.",
      );
    }

    const { signal, cleanup } = this.createAbortSignal(options.signal);

    const headers: Record<string, string> = { ...options.headers };
    if (this.userAgent && !headers["User-Agent"]) {
      headers["User-Agent"] = this.userAgent;
    }

    let fetchBody: string | undefined;
    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
      fetchBody = JSON.stringify(options.body);
    }

    try {
      const response = await fetchImpl(url, { method, headers, signal, body: fetchBody });

      if (!response.ok) {
        const body = await this.safeReadBody(response);
        throw new EODHDHttpError({
          status: response.status,
          statusText: response.statusText,
          url,
          body,
        });
      }

      if (responseType === "text") {
        return (await response.text()) as T;
      }
      if (responseType === "arrayBuffer") {
        return (await response.arrayBuffer()) as T;
      }
      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new EODHDTimeoutError("Request timed out");
      }
      throw error;
    } finally {
      cleanup();
    }
  }

  // -----------------------------------------------------------------------
  // URL building
  // -----------------------------------------------------------------------

  private buildUrl(options: {
    baseUrl: string;
    path: string;
    pathParams?: Record<string, string | number>;
    params?: Record<string, QueryValue>;
    responseType?: "json" | "text" | "arrayBuffer";
  }): { url: string; responseType: "json" | "text" | "arrayBuffer" } {
    const baseUrl = options.baseUrl.replace(/\/+$/, "");
    const path = options.path.startsWith("/")
      ? options.path
      : `/${options.path}`;
    const resolvedPath = path.replace(/\{([^}]+)\}/g, (_match, key) => {
      const value = options.pathParams?.[key];
      if (value === undefined || value === null) {
        throw new EODHDConfigError(`Missing path parameter: ${key}`);
      }
      return encodeURIComponent(String(value));
    });

    const url = new URL(`${baseUrl}${resolvedPath}`);
    const mergedParams: Record<string, QueryValue> = {
      ...this.defaultParams,
      ...options.params,
    };
    mergedParams.api_token = this.apiKey;

    Object.entries(mergedParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        const joined = value
          .map((item) => this.formatQueryValue(item))
          .join(",");
        if (joined.length > 0) {
          url.searchParams.set(key, joined);
        }
        return;
      }
      url.searchParams.set(key, this.formatQueryValue(value));
    });

    const responseType =
      options.responseType ?? this.inferResponseType(options.params);

    return { url: url.toString(), responseType };
  }

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  private formatQueryValue(value: string | number | boolean | Date): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "boolean") {
      return value ? "1" : "0";
    }
    return String(value);
  }

  private inferResponseType(
    params?: Record<string, QueryValue>,
  ): "json" | "text" | "arrayBuffer" {
    const fmt = params?.fmt;
    if (fmt === "csv" || fmt === "xml") {
      return "text";
    }
    return "json";
  }

  private createAbortSignal(signal?: AbortSignal): {
    signal: AbortSignal;
    cleanup: () => void;
  } {
    const controller = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (this.timeoutMs > 0) {
      timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
    }

    if (signal) {
      if (signal.aborted) {
        controller.abort();
      } else {
        signal.addEventListener("abort", () => controller.abort(), {
          once: true,
        });
      }
    }

    return {
      signal: controller.signal,
      cleanup: () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      },
    };
  }

  private async safeReadBody(response: Response): Promise<string | undefined> {
    try {
      return await response.text();
    } catch {
      return undefined;
    }
  }
}
