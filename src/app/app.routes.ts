import { Routes } from '@angular/router';
import { authGuard } from './core/services/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./layout/full-layout/full-layout.component').then(
        (m) => m.FullLayoutComponent
      ),
    children: [
      {
        path: '',

        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'menus',
        loadComponent: () =>
          import('./pages/menus/menus.component').then((m) => m.MenusComponent),
      },

      {
        path: 'view-menu/:id/:name',
        loadComponent: () =>
          import('./pages/view-menu/view-menu.component').then(
            (m) => m.ViewMenuComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders-history/orders-history.component').then(
            (m) => m.OrdersHistoryComponent
          ),
      },
      {
        path: 'order/:id',
        loadComponent: () =>
          import('./pages/order/order.component').then((m) => m.OrderComponent),
      },
    ],
  },
  {
    path:'',

    loadComponent: () =>
      import('./layout/content-layout/content-layout.component').then(
        (m) => m.ContentLayoutComponent
      ),
      children:[

        {
          path: 'auth',
          loadComponent: () =>
            import('./pages/login/login.component').then((m) => m.LoginComponent),
        },
      ]
  }

];
