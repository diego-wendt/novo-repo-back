import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });

  setupSwagger(app)

  await app.listen(3000).then(() => {
    console.log("no ar")
  }).catch((error) => {
    console.log(error)
  })
}
bootstrap();
