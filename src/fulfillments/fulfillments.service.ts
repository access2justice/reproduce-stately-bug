import { Injectable } from '@nestjs/common';
import { StateMachines } from './state-machines/state-machines.service';
import { StateValue } from 'xstate';
import { SendEventDto } from './dto/send-event.dto';

export interface StateLoadedFulfillment {
  permittedStatelyEvents: SendEventDto[];
  status: StateValue;
}

@Injectable()
export class FulfillmentsService {
  constructor(private readonly stateMachines: StateMachines) {}

  async getStateLoaded(): Promise<StateLoadedFulfillment> {
    const instance = this.stateMachines.incorporationLLCSCMachine.getInstance();
    const snapshot = instance.getSnapshot();

    console.log(snapshot.value);

    const permittedEvents =
      this.stateMachines.incorporationLLCSCMachine.getPermittedEvents(
        instance,
        snapshot,
      );

    return {
      permittedStatelyEvents: permittedEvents,
      status: snapshot.value,
    };
  }
}
