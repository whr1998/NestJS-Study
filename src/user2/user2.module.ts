import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { User2Service } from './user2.service';
import { User2Controller } from './user2.controller';
import { Logger } from 'src/middleware';

@Module({
  controllers: [User2Controller],
  providers: [User2Service],
  exports: [User2Service],
})
export class User2Module implements NestModule {
  // 依赖注入中间件
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Logger).forRoutes('user2');
    // consumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'user2', method: RequestMethod.GET });
    consumer.apply(Logger).forRoutes(User2Controller);
  }
}
