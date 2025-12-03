import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MockApiInterceptor implements HttpInterceptor {

    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method === 'GET' && req.url.endsWith('/api/tasks')) {
            return of(new HttpResponse({
                status: 200,
                body: []
            })).pipe(delay(300));
        }

         if(req.method === 'POST' && req.url.endsWith('/api/tasks')) {
            return of(new HttpResponse({
                status: 200,
                body: []
            })).pipe(delay(300));
        }
    return next.handle(req);
  }
}