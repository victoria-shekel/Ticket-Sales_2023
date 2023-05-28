import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.Token;
    console.log(`interceptor1 request with token ${token} to ${req.urlWithParams} method:${req.method}` );

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }

  }
}
