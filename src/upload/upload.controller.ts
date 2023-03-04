import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UploadService } from './upload.service';
import type { Response } from 'express';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 上传接口
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return 'xxxx';
  }

  // download下载
  @Get('export')
  export(@Res() res: Response) {
    const url = join(__dirname, '../images/1677826481750.png');
    res.download(url);
  }

  @Get('stream')
  async stream(@Res() res: Response) {
    const url = join(__dirname, '../images/1677826481750.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=xjd');
    tarStream.pipe(res);
  }
}
