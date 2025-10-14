import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permitir CORS (para conectar con Flutter)
  app.enableCors({
    origin: '*', // luego puedes restringirlo si deseas
    methods: 'GET,POST,PUT,DELETE',
  });

  // Activar validaciones automáticas de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora propiedades extra no definidas en DTOs
      forbidNonWhitelisted: true, // lanza error si se mandan propiedades desconocidas
      transform: true, // convierte automáticamente tipos primitivos
    }),
  );

  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000`);
}
bootstrap();
