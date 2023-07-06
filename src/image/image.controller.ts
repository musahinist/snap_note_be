import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';

import { ImageService } from './image.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg)',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    this.imageService.upload(file);
  }

  @Post('upload-all')
  @UseInterceptors(FilesInterceptor('file[]', 5))
  uploadAll(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.imageService.uploadAll(files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.imageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imageService.update(+id, updateImageDto);
  // }
}
