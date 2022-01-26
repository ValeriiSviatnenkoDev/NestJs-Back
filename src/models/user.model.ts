import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
    @Prop({ unique: true })
    userlogin: String;

    @Prop({ unique: true })
    useremail: String;

    @Prop()
    userpassword: String;

    @Prop()
    userrole: String;

    @Prop()
    userlvl: Number;

    @Prop()
    userxp: Number;
}

export type UserModel = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);