import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { Interval, KlinesAnalysis, KlinesParams } from './types/klines.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KlinesService {
  constructor(private readonly configService: ConfigService) {}

  async getKlines(
    symbol: string,
    interval: Interval,
    startTime?: number,
    endTime?: number,
    limit?: number,
  ): Promise<string[][]> {
    if (!symbol || !interval) {
      throw new BadRequestException('Missing required parameters');
    }

    if (!Object.values(Interval).includes(interval)) {
      throw new BadRequestException('Invalid interval');
    }

    const baseUrl = this.configService.get('BINANCE_API_URL');
    const params: KlinesParams = {
        symbol,
        interval,
    }
    
    if (startTime) params.startTime = startTime.toString();
    if (endTime) params.endTime = endTime.toString();
    if (limit) params.limit = limit.toString();    

    const response = await axios.get(`${baseUrl}klines`, { params });
    return response.data;
  }

  async analyzeKlines(
    symbol: string,
    interval: Interval,
    startTime?: number,
    endTime?: number,
    limit?: number,

  ): Promise<KlinesAnalysis> {
    const klines = await this.getKlines(
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    );
    if (!klines) {
      throw new NotFoundException('No klines found');
    }

    const minPrice = parseFloat(
      Math.min(...klines.map((kline) => parseFloat(kline[3]))).toFixed(2),
    );
    const maxPrice = parseFloat(
      Math.max(...klines.map((kline) => parseFloat(kline[2]))).toFixed(2),
    );
    const closePrice = parseFloat(klines[klines.length - 1][4]);
    const openPrice = parseFloat(klines[0][1]);
    const priceChange = parseFloat((closePrice - openPrice).toFixed(2));
    const pricePercentageChange = parseFloat(
      ((priceChange / openPrice) * 100).toFixed(2),
    );
    const priceRange = parseFloat((maxPrice - minPrice).toFixed(2));

    const totalVolume = parseFloat(
      klines.reduce((sum, kline) => sum + parseFloat(kline[5]), 0).toFixed(2),
    );
    const averageVolume = parseFloat((totalVolume / klines.length).toFixed(2));
    const totalTrades = klines.reduce(
      (sum, kline) => sum + parseFloat(kline[8]),
      0,
    );

    return {
      priceAnalysis: {
        minPrice,
        maxPrice,
        priceChange,
        openPrice,
        closePrice,
        pricePercentageChange,
        priceRange,
      },
      volumeAnalysis: {
        totalVolume,
        averageVolume,
      },
      tradeAnalysis: {
        totalTrades,
      },
    };
  }
}
