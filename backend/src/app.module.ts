import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {mongoURI} from './config/keys'
import {UserModule} from './user/user.module'

@Module({
  imports: [UserModule, MongooseModule.forRoot(mongoURI) ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
