export type DateString = string;

export interface EodBar {
  date: DateString;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close?: number;
  volume?: number;
}

export interface IntradayBar {
  timestamp: number;
  gmtoffset: number;
  datetime?: string;
  date?: DateString;
  time?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickTrade {
  timestamp: number;
  gmtoffset: number;
  datetime?: string;
  price: number;
  volume: number;
}

export interface RealTimeQuote {
  code: string;
  timestamp: number;
  gmtoffset: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  previousClose?: number;
  change?: number;
  change_p?: number;
  [key: string]: unknown;
}

export interface DividendRecord {
  date: DateString;
  declarationDate?: DateString;
  recordDate?: DateString;
  paymentDate?: DateString;
  period?: string;
  value?: number;
  unadjustedValue?: number;
  currency?: string;
}

export interface SplitRecord {
  date: DateString;
  split?: string;
  split_ratio?: number;
  ratio?: number;
}

export interface NewsArticle {
  date: string;
  title: string;
  content?: string;
  link?: string;
  symbols?: string[];
  tags?: string[];
  sentiment?: {
    polarity?: number;
    neg?: number;
    neu?: number;
    pos?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export type FundamentalsResponse = Record<string, unknown>;
export type EconomicEvent = Record<string, unknown>;
export type ScreenerResult = Record<string, unknown>;
export type SentimentRecord = Record<string, unknown>;
export type MacroIndicatorRecord = Record<string, unknown>;
