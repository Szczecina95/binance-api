import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KlinesModule } from './klines/klines.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), KlinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
