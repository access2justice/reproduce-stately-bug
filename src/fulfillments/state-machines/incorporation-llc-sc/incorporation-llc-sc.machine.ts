import { XStateMachine } from '../state-machine.util';
import { machine as machineLLCSC } from './incorporation-llc-sc.xstate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IncorporationLLCSCMachine extends XStateMachine {
  constructor() {
    super(
      machineLLCSC,
      './src/fulfillments/state-machines/incorporation-llc-sc/incorporation-llc-sc.xstate.ts',
    );
  }
}
