// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   console.log(process.env.PORT ?? 3000)
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap().catch(console.error);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Activer CORS
  app.enableCors({
    origin: '*', // tu peux mettre l'URL de ton app mobile/web si tu veux restreindre
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  console.log(`Server running on port ${port}`);

  await app.listen(port);
}

bootstrap().catch(console.error);

