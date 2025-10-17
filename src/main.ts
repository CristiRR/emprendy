import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permitir CORS (para conectar con Flutter)
  app.enableCors({
    origin: ['http://localhost:3000', 'http://10.0.2.2:3000', 'http://127.0.0.1:3000', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });


  // Activar validaciones automáticas de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000`);
}
bootstrap();
