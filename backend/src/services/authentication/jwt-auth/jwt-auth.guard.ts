import { Injectable } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor() {

    super();
    console.log('Constructor JwtAuthGuard');

  }
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   return true;
  // }
}
