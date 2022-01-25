import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './signup.model';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [SignupService],
  controllers: [SignupController]
})

export class SignupModule { }
