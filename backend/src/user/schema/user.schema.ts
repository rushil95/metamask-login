import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
   username: string;

  @Prop({
    required: true,
    default: (): number => Math.floor(Math.random() * 10000),
  })
  nonce: number;

  @Prop({
    unique: true,
    required: true,
  })
  publicAddress: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
