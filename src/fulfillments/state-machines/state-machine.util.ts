import {
  StateMachine,
  MachineContext,
  EventObject,
  createActor,
  Snapshot,
  Actor,
  AnyActorRef,
  ParameterizedObject,
  StateValue,
  AnyActorLogic,
  MachineSnapshot,
} from 'xstate';
import { compileMachineEventsInterface } from './utils';
import { SendEventDto } from '../dto/send-event.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class XStateMachine {
  private readonly machine: StateMachine<
    MachineContext,
    EventObject,
    Record<string, AnyActorRef>,
    { src: 'backend'; logic: any; type: string },
    ParameterizedObject,
    ParameterizedObject,
    string,
    StateValue,
    string,
    any,
    any
  >;

  public events: SendEventDto[];

  constructor(
    machine: StateMachine<
      MachineContext,
      any,
      Record<string, AnyActorRef>,
      any,
      ParameterizedObject,
      ParameterizedObject,
      string,
      StateValue,
      string,
      any,
      any
    >,
    fileLocation: string,
  ) {
    this.machine = machine;
    this.events = compileMachineEventsInterface(fileLocation);
  }

  getInstance() {
    const snapshot = {
      status: 'active',
      output: null,
      error: null,
      value: {
        'Data Preparation': {
          Intake: {
            LawLift: 'Received',
            Passports: 'Received',
            'Payment Requirement': 'Start',
          },
        },
      },
      historyValue: {},
      context: {},
      children: {},
    } as any;
    const actor = createActor(this.machine, {
      snapshot, // && Object.assign({ children: {} }, snapshot),
    });
    actor.start();
    return actor;
  }

  async getState(actor: Actor<any>) {
    return actor.getPersistedSnapshot();
  }

  public getPermittedEvents = (
    instance: Actor<AnyActorLogic>,
    snapshot: MachineSnapshot<
      MachineContext,
      EventObject,
      Record<string, AnyActorRef>,
      StateValue,
      string,
      any
    >,
  ) => {
    const permittedEvents = (instance.src as any).events.filter(
      (event: string) => {
        const flag = snapshot.can({ type: event });
        return !!flag;
      },
    ) as string[];

    const pEventsWithParams = this.events.filter((ee) =>
      permittedEvents.includes(ee.name),
    );

    return pEventsWithParams;
  };

  public sendEvent = (
    eventName: string,
    params: Record<string, string>,
    instance: Actor<AnyActorLogic>,
    snapshot: MachineSnapshot<
      MachineContext,
      EventObject,
      Record<string, AnyActorRef>,
      StateValue,
      string,
      any
    >,
  ) => {
    const permittedEvents = this.getPermittedEvents(instance, snapshot);

    const pE = permittedEvents.find((pE) => pE.name === eventName);

    if (!pE)
      throw new HttpException(
        `Event "${eventName}" is not permitted for the given fulfillment state. Pick one of the following: ${permittedEvents.reduce(
          (p, c) => p + c.name + ', ',
          '',
        )}`,
        HttpStatus.CONFLICT,
      );

    instance.send({ type: eventName, ...params });
  };
}
