// app.module.ts 用于处理其他类的引用与共享
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { User2Module } from './user2/user2.module';

// 类装饰器
@Module({
  imports: [UserModule, UploadModule, User2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
