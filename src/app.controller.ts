// app.controller.ts 用来处理http请求以及调用service层的方法，添加路由，类似于vue的router
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 依赖注入，通过ioc控制反转进行实例化
  constructor(private readonly appService: AppService) {}
}
