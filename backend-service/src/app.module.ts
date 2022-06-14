import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
   
   MongooseModule.forRoot(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    bufferMaxEntries: 0,
    bufferCommands: false
  }),
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
