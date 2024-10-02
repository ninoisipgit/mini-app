import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    { provide: HttpClient, useFactory: provideHttpClient },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
