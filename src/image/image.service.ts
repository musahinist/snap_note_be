import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import streamifier from 'streamifier';
@Injectable()
export class ImageService {
  upload(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  // uploadAll(
  //   files: Array<Express.Multer.File>,
  // ): Promise<UploadApiResponse | UploadApiErrorResponse>[] {
  //   return files.map((file) => this.upload(file));
  // }

  remove(id: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(id, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
