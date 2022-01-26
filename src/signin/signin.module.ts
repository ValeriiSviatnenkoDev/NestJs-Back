import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/models/user.model';
import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [SigninController],
    providers: [SigninService]
})
export class SigninModule { }
