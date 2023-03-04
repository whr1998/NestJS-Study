// 主入口文件
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import * as session from 'express-session';
import { Request, Response as Res, NextFunction } from 'express';
import * as cors from 'cors';

const whiteList = ['/user2'];

function MiddlewareAll(req: Request, res: Res, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send('小黑子');
  }
}

async function bootstrap() {
  // 类似于vue的app.vue
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 开启版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 设置静态文件访问目录
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/static',
  });
  // 自带的跨域
  app.enableCors();
  // 中间件跨域
  app.use(cors);
  // 相应拦截器
  app.useGlobalInterceptors(new Response());
  // 错误拦截器
  app.useGlobalFilters(new HttpFilter());
  // session
  app.use(
    session({
      secret: 'xjd',
      rolling: true,
      name: 'xjd.sid',
      cookie: {
        maxAge: 9999,
      },
    }),
  );
  // 全局中间件
  app.use(MiddlewareAll);
  // 监听的端口
  await app.listen(3000);
}
bootstrap();
