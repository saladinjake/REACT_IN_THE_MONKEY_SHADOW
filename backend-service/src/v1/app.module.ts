import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule, ConfigsModule } from './configs';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users';
import { LoggerMiddleware } from './middlewares';

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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
