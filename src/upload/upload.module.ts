import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Upload } from './entities/upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), CloudinaryModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule { }
