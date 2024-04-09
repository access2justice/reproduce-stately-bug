/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types" />
/// <reference types="mongoose/types/inferschematype" />
import { Snapshot } from 'xstate';
import { Schema as MongooseSchema } from 'mongoose';
export declare enum FulfillmentType {
    INCORPORATION_LLC_SC = "incorporation-llc-sc",
    SIMPLE = "simple"
}
export interface Comment {
    name: string;
    timestamp: Date;
    text: string;
}
export declare class Fulfillment {
    _id: MongooseSchema.Types.ObjectId;
    snapshot: Snapshot<undefined>;
    type: FulfillmentType;
    comments: Comment[];
}
export declare const FulfillmentSchema: any;
