import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { v2 as cloudinary } from 'cloudinary';
@Module({
  controllers: [ImageController],
  providers: [
    ImageService,
    {
      provide: 'CLOUDINARY',
      useFactory: () => {
        return cloudinary.config({
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
      },
    },
  ],
  exports: [ImageService],
})
export class ImageModule {}
