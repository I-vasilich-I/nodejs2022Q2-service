import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { CustomLogger } from './core/logger/logger.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const PORT = process.env.PORT || 5000;
  const logLevel = +process.env.LOG_LEVEL || 4;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(new CustomLogger(logLevel));

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });

  SwaggerModule.setup('doc', app, parse(document));

  await app
    .listen(PORT)
    .then(() => console.log(`Server's running on port: ${PORT}`));
}
bootstrap();

process.on('unhandledRejection', (error) => {
  console.error(error);
  fs.appendFile(
    'unhandled-error.log',
    JSON.stringify(error),
    { encoding: 'utf8' },
    (err) => {
      if (err) throw err;
    },
  );
  throw error;
});

process.on('uncaughtException', (error) => {
  fs.appendFile(
    'uncaught-error.log',
    JSON.stringify(error),
    { encoding: 'utf8' },
    (err) => {
      if (err) throw err;
    },
  );

  process.exit(1);
});
