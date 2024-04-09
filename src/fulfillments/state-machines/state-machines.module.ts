import { Module } from '@nestjs/common';
import { StateMachines } from './state-machines.service';
import { IncorporationLLCSCMachine } from './incorporation-llc-sc/incorporation-llc-sc.machine';

@Module({
  imports: [],
  controllers: [],
  providers: [StateMachines, IncorporationLLCSCMachine],
  exports: [StateMachines, IncorporationLLCSCMachine],
})
export class StateMachinesModule {}
