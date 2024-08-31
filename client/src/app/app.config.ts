import {
  ApplicationConfig,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [{ path: 'login', component: LoginPageComponent }];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
