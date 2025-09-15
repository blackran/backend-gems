import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

const expressApp = express();
let isBootstrapped = false;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.enableCors();
    await app.init();
    isBootstrapped = true;
}

export default async (req: Request, res: Response) => {
    if (!isBootstrapped) {
        await bootstrap();
    }
    return expressApp(req, res);
};
