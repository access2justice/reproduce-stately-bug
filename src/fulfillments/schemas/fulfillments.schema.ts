import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Snapshot } from 'xstate';
import { Schema as MongooseSchema } from 'mongoose';

export enum FulfillmentType {
  INCORPORATION_LLC_SC = 'incorporation-llc-sc',
  SIMPLE = 'simple',
}

export interface Comment {
  name: string;
  timestamp: Date;
  text: string;
}

@Schema({ timestamps: true })
export class Fulfillment {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: {}, required: true })
  snapshot: Snapshot<undefined>;

  @Prop({ required: true, enum: FulfillmentType })
  type: FulfillmentType;

  @Prop({
    type: [
      {
        name: String,
        timestamp: Date,
        text: String,
      },
    ],
  })
  comments: Comment[];
}

export const FulfillmentSchema = SchemaFactory.createForClass(Fulfillment);
