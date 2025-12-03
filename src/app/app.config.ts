import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoAPIService } from './Features/Services/TodoAPIService/todo-apiservice';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: HTTP_INTERCEPTORS,useClass: TodoAPIService,multi:true}
  ]
};
