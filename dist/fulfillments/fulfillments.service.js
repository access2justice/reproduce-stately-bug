"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentsService = void 0;
const common_1 = require("@nestjs/common");
const state_machines_service_1 = require("./state-machines/state-machines.service");
let FulfillmentsService = class FulfillmentsService {
    constructor(stateMachines) {
        this.stateMachines = stateMachines;
    }
    async getStateLoaded() {
        const instance = this.stateMachines.incorporationLLCSCMachine.getInstance();
        const snapshot = instance.getSnapshot();
        console.log(snapshot.value);
        const permittedEvents = this.stateMachines.incorporationLLCSCMachine.getPermittedEvents(instance, snapshot);
        return {
            permittedStatelyEvents: permittedEvents,
            status: snapshot.value,
        };
    }
};
exports.FulfillmentsService = FulfillmentsService;
exports.FulfillmentsService = FulfillmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_machines_service_1.StateMachines])
], FulfillmentsService);
//# sourceMappingURL=fulfillments.service.js.map