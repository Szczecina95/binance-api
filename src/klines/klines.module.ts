import { Module } from '@nestjs/common';
import { KlinesService } from './klines.service';
import { KlinesController } from './klines.controller';

@Module({
  providers: [KlinesService],
  controllers: [KlinesController],
})
export class KlinesModule {}
