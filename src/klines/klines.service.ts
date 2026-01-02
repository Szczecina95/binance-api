import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Interval } from './types/klines.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KlinesService {
    constructor(private readonly configService: ConfigService) {}

    async getKlines(symbol: string, interval: Interval, limit: number, startTime: number, endTime: number) {
        if(!symbol || !interval) {
            throw new BadRequestException('Missing required parameters');
        }

        const baseUrl = this.configService.get('BINANCE_API_URL');
        const response = await axios.get(`${baseUrl}klines`, {
            params: {
                symbol,
                interval,
                limit,
                startTime,
                endTime,
            },
        });
        return response.data;
    }

    async analyzeKlines(symbol: string, interval: Interval, limit: number, startTime: number, endTime: number) {
        if(!symbol || !interval) {
            throw new BadRequestException('Missing required parameters');
        }

        const klines = await this.getKlines(symbol, interval, limit, startTime, endTime);
        const minPrice = Math.min(...klines.map((kline) => parseFloat(kline[2])));
        const maxPrice = Math.max(...klines.map((kline) => parseFloat(kline[3])));
        const priceRange = maxPrice - minPrice;
        const pricePercentageChange = parseFloat(((maxPrice - minPrice) / minPrice * 100).toFixed(2));
        const averagePrice = parseFloat((klines.reduce((sum, kline) => sum + parseFloat(kline[2]), 0) / klines.length).toFixed(2));

        const totalVolume = parseFloat(klines.reduce((sum, kline) => sum + parseFloat(kline[5]), 0).toFixed(2));
        const averageVolume = parseFloat((totalVolume / klines.length).toFixed(2));

        const totalTrades = klines.reduce((sum, kline) => sum + parseFloat(kline[8]), 0);

        return {
            priceAnalysis: {
                minPrice,
                maxPrice,
                priceRange,
                pricePercentageChange,
                averagePrice,
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
