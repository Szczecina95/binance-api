import { Test, TestingModule } from '@nestjs/testing';
import { KlinesController } from './klines.controller';
import { KlinesService } from './klines.service';
import { ConfigService } from '@nestjs/config';
import { Interval } from './types/klines.types';

describe('KlinesController', () => {
  let controller: KlinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KlinesController],
      providers: [KlinesService, {
        provide: ConfigService,
        useValue: {
          get: jest.fn().mockReturnValue('https://api.binance.com/api/v3'),
        },
      }],
    }).compile();

    controller = module.get<KlinesController>(KlinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('check if getKlines endpoint is defined', () => {
    expect(controller.getKlines).toBeDefined();
  });

  it('check if analyzeKlines endpoint is defined', () => {
    expect(controller.analyzeKlines).toBeDefined();
  });

});
