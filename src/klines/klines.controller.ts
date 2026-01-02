import { Controller, ParseEnumPipe } from '@nestjs/common';
import { Get, Query } from '@nestjs/common';
import { Interval, KlinesAnalysis } from './types/klines.types';
import { KlinesService } from './klines.service';

@Controller('klines')
export class KlinesController {
  constructor(private readonly klinesService: KlinesService) {}

  @Get('analyze')
  analyzeKlines(
    @Query('symbol') symbol: string,
    @Query('interval', new ParseEnumPipe(Interval)) interval: Interval,
    @Query('limit') limit: number = 1000,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ): Promise<KlinesAnalysis> {
    return this.klinesService.analyzeKlines(
      symbol,
      interval,
      limit,
      startTime,
      endTime,
    );
  }
  @Get()
  getKlines(
    @Query('symbol') symbol: string,
    @Query('interval', new ParseEnumPipe(Interval)) interval: Interval,
    @Query('limit') limit: number = 1000,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ): Promise<string[][]> {
    return this.klinesService.getKlines(
      symbol,
      interval,
      limit,
      startTime,
      endTime,
    );
  }
}
