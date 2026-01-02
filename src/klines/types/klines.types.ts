export enum Interval {
  ONE_MINUTE = '1m',
  THREE_MINUTES = '3m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  SIX_HOURS = '6h',
  EIGHT_HOURS = '8h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
}

export type KlinesParams = {
  symbol: string;
  interval: Interval;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface PriceAnalysis {
  minPrice: number;
  maxPrice: number;
  priceChange: number;
  openPrice: number;
  closePrice: number;
  pricePercentageChange: number;
  priceRange: number;
}

export interface VolumeAnalysis {
  totalVolume: number;
  averageVolume: number;
}

export interface TradeAnalysis {
  totalTrades: number;
}

export interface KlinesAnalysis {
  priceAnalysis: PriceAnalysis;
  volumeAnalysis: VolumeAnalysis;
  tradeAnalysis: TradeAnalysis;
}
