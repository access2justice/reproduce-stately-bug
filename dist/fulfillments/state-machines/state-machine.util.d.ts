import { StateMachine, MachineContext, Actor, AnyActorRef, ParameterizedObject, StateValue } from 'xstate';
import { SendEventDto } from '../dto/send-event.dto';
export declare class XStateMachine {
    private readonly machine;
    events: SendEventDto[];
    constructor(machine: StateMachine<MachineContext, any, Record<string, AnyActorRef>, any, ParameterizedObject, ParameterizedObject, string, StateValue, string, any, any>, fileLocation: string);
    getInstance(): any;
    getState(actor: Actor<any>): Promise<any>;
    getPermittedEvents: (instance: Actor<AnyActorLogic>, snapshot: MachineSnapshot<MachineContext, EventObject, Record<string, AnyActorRef>, StateValue, string, any>) => SendEventDto[];
    sendEvent: (eventName: string, params: Record<string, string>, instance: Actor<AnyActorLogic>, snapshot: MachineSnapshot<MachineContext, EventObject, Record<string, AnyActorRef>, StateValue, string, any>) => void;
}
