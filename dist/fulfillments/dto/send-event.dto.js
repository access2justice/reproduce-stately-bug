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
exports.SendEventDto = void 0;
const class_validator_1 = require("class-validator");
const incorporation_llc_sc_machine_1 = require("../state-machines/incorporation-llc-sc/incorporation-llc-sc.machine");
const events = new incorporation_llc_sc_machine_1.IncorporationLLCSCMachine().events;
const eventNames = events.map((event) => event.name);
let CustomNestedValidator = class CustomNestedValidator {
    validate(propertyValues, args) {
        if (!propertyValues)
            return false;
        if (typeof propertyValues !== 'object')
            return false;
        const validEvent = events.find((e) => e.name === args.object.name);
        const validParams = (validEvent || {})?.params || {};
        let valid = true;
        const hasMissingKey = !Object.keys(validParams).every((k) => propertyValues[k]);
        if (hasMissingKey)
            valid = false;
        const hasWrongKey = Object.keys(propertyValues).find((pV) => !validParams[pV]);
        if (hasWrongKey)
            valid = false;
        return valid;
    }
    defaultMessage(args) {
        const validEvent = events.find((e) => e.name === args.object.name);
        const validParams = (validEvent || {})?.params || {};
        if (!args.value)
            return 'The event is missing the params object.';
        if (typeof args.value !== 'object')
            return 'The event params field should be an object.';
        const missingKeys = Object.keys(validParams).filter((k) => !args.value[k]);
        let message = '';
        if (missingKeys.length > 0) {
            message = `The params for event ${args.object.name} are missing the following keys: ${missingKeys.join(', ')}`;
        }
        const wrongKeys = Object.keys(args.value).filter((pV) => !validParams[pV]);
        if (wrongKeys.length > 0) {
            message = `The params for event ${args.object.name} may not contain the following keys: ${wrongKeys.join(', ')}`;
        }
        return message;
    }
};
CustomNestedValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], CustomNestedValidator);
function ValidateParams(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CustomNestedValidator,
        });
    };
}
class SendEventDto {
}
exports.SendEventDto = SendEventDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(eventNames),
    __metadata("design:type", String)
], SendEventDto.prototype, "name", void 0);
__decorate([
    ValidateParams(),
    __metadata("design:type", Object)
], SendEventDto.prototype, "params", void 0);
//# sourceMappingURL=send-event.dto.js.map