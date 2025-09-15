import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleDriveService {
    private drive;

    constructor() {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json', // ton fichier de service account
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        this.drive = google.drive({ version: 'v3', auth });
    }

    async uploadFile(filename: string, buffer: Buffer) {
        const res = await this.drive.files.create({
            requestBody: {
                name: filename,
                mimeType: 'image/jpeg',
            },
            media: {
                mimeType: 'image/jpeg',
                body: Buffer.from(buffer),
            },
        });
        return res.data;
    }
}
