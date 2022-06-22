import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule, ConfigsModule } from './configs';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    
  }
}
