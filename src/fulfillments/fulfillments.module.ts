import { Module } from '@nestjs/common';
import { FulfillmentsController } from './fulfillments.controller';
import { FulfillmentsService } from './fulfillments.service';
import { StateMachines } from './state-machines/state-machines.service';
import { StateMachinesModule } from './state-machines/state-machines.module';

@Module({
  imports: [StateMachinesModule],
  controllers: [FulfillmentsController],
  providers: [FulfillmentsService, StateMachines],
})
export class FulfillmentsModule {}
