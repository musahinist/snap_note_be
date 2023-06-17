import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  // app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('SnapNotes API')
    .setDescription('The SnapNotes API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3000);
  Logger.log(`Server started running on: ${await app.getUrl()}`, 'Bootstrap');
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
}
bootstrap();
