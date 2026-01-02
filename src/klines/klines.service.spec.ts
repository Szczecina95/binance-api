import { Test, TestingModule } from '@nestjs/testing';
import { KlinesService } from './klines.service';
import { Interval } from './types/klines.types';
import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('KlinesService', () => {
  let service: KlinesService;


  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'BINANCE_API_URL') {
        return 'https://api.binance.com/api/v3/';
      }
    }),
  };

  mockAxios.get.mockResolvedValue({
    data: [
      [
        1499040000000,      // Open time
        "0.01634790",       // Open
        "0.80000000",       // High
        "0.01575800",       // Low
        "0.01577100",       // Close
        "148976.11427815",  // Volume
        1499644799999,      // Close time
        "2434.19055334",    // Quote asset volume
        308,                // Number of trades
        "1756.87402397",    // Taker buy base asset volume
        "28.46694368",      // Taker buy quote asset volume
        "17928899.62484339" // Ignore.
      ]
    ]
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KlinesService, {
        provide: ConfigService,
        useValue: mockConfigService,
      }
    ],
    }).compile();

    service = module.get<KlinesService>(KlinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the klines', async () => {
    const klines = await service.getKlines('BTCUSDT', Interval.ONE_MINUTE, 1000, 1714358400000, 1714358400000);
    expect(klines).toBeDefined();
    expect(axios.get).toHaveBeenCalled();
  });

  it('should analyze the klines', async () => {
    const analysis = await service.analyzeKlines('BTCUSDT', Interval.ONE_MINUTE, 1000, 1714358400000, 1714358400000);
    expect(analysis).toBeDefined();
    expect(analysis.priceAnalysis).toBeDefined();
    expect(analysis.volumeAnalysis).toBeDefined();
    expect(analysis.tradeAnalysis).toBeDefined();
  });

  it('should throw an error if the symbol is missing', async () => {
    await expect(service.getKlines('', Interval.ONE_MINUTE, 1000, 1714358400000, 1714358400000)).rejects.toThrow('Missing required parameters');
  });

  it('should throw an error if the interval is invalid', async () => {
    await expect(service.getKlines('BTCUSDT', '12m' as any, 1000, 1714358400000, 1714358400000)).rejects.toThrow(BadRequestException);
  });
});
