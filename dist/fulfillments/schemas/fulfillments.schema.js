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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentSchema = exports.Fulfillment = exports.FulfillmentType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const xstate_1 = require("xstate");
const mongoose_2 = require("mongoose");
var FulfillmentType;
(function (FulfillmentType) {
    FulfillmentType["INCORPORATION_LLC_SC"] = "incorporation-llc-sc";
    FulfillmentType["SIMPLE"] = "simple";
})(FulfillmentType || (exports.FulfillmentType = FulfillmentType = {}));
let Fulfillment = class Fulfillment {
};
exports.Fulfillment = Fulfillment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Fulfillment.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {}, required: true }),
    __metadata("design:type", typeof (_a = typeof xstate_1.Snapshot !== "undefined" && xstate_1.Snapshot) === "function" ? _a : Object)
], Fulfillment.prototype, "snapshot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: FulfillmentType }),
    __metadata("design:type", String)
], Fulfillment.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                name: String,
                timestamp: Date,
                text: String,
            },
        ],
    }),
    __metadata("design:type", Array)
], Fulfillment.prototype, "comments", void 0);
exports.Fulfillment = Fulfillment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Fulfillment);
exports.FulfillmentSchema = mongoose_1.SchemaFactory.createForClass(Fulfillment);
//# sourceMappingURL=fulfillments.schema.js.map