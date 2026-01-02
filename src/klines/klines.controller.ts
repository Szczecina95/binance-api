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
    @Query('startTime') startTime?: number,
    @Query('endTime') endTime?: number,
    @Query('limit') limit?: number,
  ): Promise<KlinesAnalysis> {
    return this.klinesService.analyzeKlines(
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    );
  }

  @Get()
  getKlines(
    @Query('symbol') symbol: string,
    @Query('interval', new ParseEnumPipe(Interval)) interval: Interval,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
    @Query('limit') limit: number,

  ): Promise<string[][]> {
    return this.klinesService.getKlines(
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    );
  }
}
