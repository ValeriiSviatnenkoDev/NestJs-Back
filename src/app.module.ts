import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* Imports */
import { SignupModule } from './signup/signup.module';

/* Providers */
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://shopopalo:ValeriiSviatnenko1806@cluster0.7efvn.mongodb.net/iStudy?retryWrites=true&w=majority'), SignupModule],
  controllers: [],
  providers: [ChatGateway],
})

export class AppModule {}
