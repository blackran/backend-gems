import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_CLOUD_NAME = "dpbninj1n"
const CLOUDINARY_API_KEY = "451598748613424"
const CLOUDINARY_API_SECRET = "H8wBxTsU9ljRGJiAu6ovvnp-UEc"

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });
    }

    async uploadImage(imageBuffer: any): Promise<any> {
        const uploadedImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'uploads_iste' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(imageBuffer);
        });
        const { secure_url, public_id } = (uploadedImage as any);
        return { imageUrl: secure_url, imageId: public_id }; // Retourne l'URL Cloudinary du fichier chiffré
    }
}