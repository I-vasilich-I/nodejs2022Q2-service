import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app
    .listen(PORT)
    .then(() => console.log(`Server's running on port: ${PORT}`));
}
bootstrap();
