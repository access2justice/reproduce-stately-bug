import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FulfillmentsModule } from './fulfillments/fulfillments.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FulfillmentsModule],
})
export class AppModule {}
