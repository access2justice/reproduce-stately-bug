"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XStateMachine = void 0;
const xstate_1 = require("xstate");
const utils_1 = require("./utils");
const common_1 = require("@nestjs/common");
class XStateMachine {
    constructor(machine, fileLocation) {
        this.getPermittedEvents = (instance, snapshot) => {
            const permittedEvents = instance.src.events.filter((event) => {
                const flag = snapshot.can({ type: event });
                return !!flag;
            });
            const pEventsWithParams = this.events.filter((ee) => permittedEvents.includes(ee.name));
            return pEventsWithParams;
        };
        this.sendEvent = (eventName, params, instance, snapshot) => {
            const permittedEvents = this.getPermittedEvents(instance, snapshot);
            const pE = permittedEvents.find((pE) => pE.name === eventName);
            if (!pE)
                throw new common_1.HttpException(`Event "${eventName}" is not permitted for the given fulfillment state. Pick one of the following: ${permittedEvents.reduce((p, c) => p + c.name + ', ', '')}`, common_1.HttpStatus.CONFLICT);
            instance.send({ type: eventName, ...params });
        };
        this.machine = machine;
        this.events = (0, utils_1.compileMachineEventsInterface)(fileLocation);
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
        };
        const actor = (0, xstate_1.createActor)(this.machine, {
            snapshot,
        });
        actor.start();
        return actor;
    }
    async getState(actor) {
        return actor.getPersistedSnapshot();
    }
}
exports.XStateMachine = XStateMachine;
//# sourceMappingURL=state-machine.util.js.map