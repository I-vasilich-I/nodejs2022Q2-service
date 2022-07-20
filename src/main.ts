import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });

  SwaggerModule.setup('doc', app, parse(document));

  await app
    .listen(PORT)
    .then(() => console.log(`Server's running on port: ${PORT}`));
}
bootstrap();
