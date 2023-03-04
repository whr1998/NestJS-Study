import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  Headers,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';

// http://localhost:3000/v1/user
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const Captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    session.code = Captcha.text;
    res.type('image/svg+xml');
    res.send(Captcha.data);
    return {
      Captcha,
    };
  }

  // 接收前端参数
  // get请求 query 装饰器是@Request和@Query
  @Get()
  findAllByRequest(@Request() req) {
    return {
      code: 200,
      msg: req.query.name,
    };
  }

  @Get()
  findAllByQuery(@Query() query) {
    return {
      code: 200,
      msg: query.name,
    };
  }

  // post请求 body 装饰器是@Request和@Body
  @Post()
  createByRequest(@Request() req) {
    return {
      code: 200,
      msg: req.body.name,
    };
  }

  @Post()
  createByQuery(@Body('name') body) {
    return {
      code: 200,
      msg: body.name,
    };
  }

  // 动态参数 params 装饰器是@Request和@param
  @Get(':id')
  findIdByRequest(@Request() req) {
    return {
      code: 200,
      msg: req.params,
    };
  }

  @Get(':id')
  findIdByParam(@Param() params, @Headers() headers) {
    return {
      code: 200,
      msg: headers.cookie,
    };
  }

  // 写一个get请求获取全部用户信息
  @Get('all')
  getAllUserInfo() {
    return this.userService.getAllUserInfo();
  }
}
