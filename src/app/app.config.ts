import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoaderService } from './core/services/loader/loader.service';
import { MenusService } from './services/menus/menus.service';
import { OrdersService } from './services/orders/orders.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MenusService, OrdersService,
    LoaderService,
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideAnimations(),
  ],
};
