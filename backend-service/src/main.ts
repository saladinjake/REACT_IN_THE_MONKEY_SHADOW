import { NestFactory } from '@nestjs/core';
import { AppModule  } from './v1/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PORT: number = config.get<number>('port') || 5000;

  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, always: true }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: 'SECRET',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
  console.log(`App is running on url: ${await app.getUrl()}`);
}
bootstrap();
