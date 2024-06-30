import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { localStorages } from '../../helper/localStorage.fun';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorages()?.getItem('currentUser')) {
    // User is logged in, so return true
    return true;
  }
  inject(Router).navigate(['auth'], { queryParams: { returnUrl: state.url } });
  return false;
};
