import { StateMachines } from './state-machines/state-machines.service';
import { StateValue } from 'xstate';
import { SendEventDto } from './dto/send-event.dto';
export interface StateLoadedFulfillment {
    permittedStatelyEvents: SendEventDto[];
    status: StateValue;
}
export declare class FulfillmentsService {
    private readonly stateMachines;
    constructor(stateMachines: StateMachines);
    getStateLoaded(): Promise<StateLoadedFulfillment>;
}
