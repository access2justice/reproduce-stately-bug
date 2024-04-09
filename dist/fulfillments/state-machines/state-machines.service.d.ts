import { IncorporationLLCSCMachine } from './incorporation-llc-sc/incorporation-llc-sc.machine';
export interface Context {
    example: string;
}
export declare class StateMachines {
    incorporationLLCSCMachine: IncorporationLLCSCMachine;
    constructor(incorporationLLCSCMachine: IncorporationLLCSCMachine);
}
