export class EODHDError extends Error {
  readonly name = "EODHDError";

  constructor(message: string) {
    super(message);
  }
}

export class EODHDConfigError extends EODHDError {
  readonly name = "EODHDConfigError";
}

export class EODHDTimeoutError extends EODHDError {
  readonly name = "EODHDTimeoutError";
}

export class EODHDHttpError extends EODHDError {
  readonly name = "EODHDHttpError";
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly body?: string;

  constructor(options: { status: number; statusText: string; url: string; body?: string }) {
    super(`Request failed with status ${options.status} ${options.statusText}`);
    this.status = options.status;
    this.statusText = options.statusText;
    this.url = options.url;
    this.body = options.body;
  }
}
