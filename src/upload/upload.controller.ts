import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
// import { CreateUploadDto } from './dto/create-upload.dto';
// import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

// import * as fs from 'fs';
// import * as path from 'path';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadTensor(
    @UploadedFile() file: any,
    @Body('comment') comment: string,
    @Body('preds') preds: any,
  ) {
    console.log('Fichier reçu:', file.originalname, file.mimetype, file.size);
    console.log('Comment reçue:', comment);
    console.log('Preds', preds);

    const image = await this.cloudinaryService.uploadImage(file.buffer);

    // // Chemin de sauvegarde
    // const savePath = path.join(__dirname, '../../uploads', file.originalname);

    // // Crée le dossier si nécessaire
    // fs.mkdirSync(path.dirname(savePath), { recursive: true });

    // // Sauvegarde du buffer
    // fs.writeFileSync(savePath, file.buffer);


    const upload = new Upload()
    upload.comment = comment;
    upload.preds = preds;
    upload.savePath = JSON.stringify(image);

    this.uploadRepository.save(upload)

    return { success: true, file: file.originalname };
  }
}
