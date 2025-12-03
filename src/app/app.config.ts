import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TodoAPIService } from './Features/Services/TodoAPIService/todo-apiservice';
import { MockApiInterceptor } from './Features/Services/mock-api.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {provide: HTTP_INTERCEPTORS,useClass: MockApiInterceptor,multi:true}
  ]
};
