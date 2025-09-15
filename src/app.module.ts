import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UploadModule } from './upload/upload.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Upload } from './upload/entities/upload.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'password',
      // database: 'iste',
      entities: [Upload],
      synchronize: true,

      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
    }),
    UploadModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule { }
