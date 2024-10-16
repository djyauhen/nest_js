import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe());

  //Документация для SWAGGER
  const config = new DocumentBuilder()
    .setTitle('NestJS API') //Заголовок для API
    .setDescription('The NestJS API description') //Краткое описание API
    .setVersion('1.0') //Версия документа
    .addTag('API') //Тег для версии приложения
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
