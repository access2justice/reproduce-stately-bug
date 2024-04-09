import { Injectable } from '@nestjs/common';
import { IncorporationLLCSCMachine } from './incorporation-llc-sc/incorporation-llc-sc.machine';

export interface Context {
  example: string;
}

@Injectable()
export class StateMachines {
  constructor(public incorporationLLCSCMachine: IncorporationLLCSCMachine) {}
}
