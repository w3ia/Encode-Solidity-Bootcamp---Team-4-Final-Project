import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,POST,OPTIONS',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };

  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Vote DApp API')
    .setDescription('API for Vote DApp Token and Ballot contracts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
