import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './app/Features/Services/mock-api.interceptor';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));