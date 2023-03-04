/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
      // console.log("I`m coming");
      // res.send("被拦截了")
      next();
  }
}
