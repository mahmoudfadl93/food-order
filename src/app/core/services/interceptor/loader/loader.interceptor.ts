import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from '../../loader/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  let service_count: number = 0;
  service_count++; // increment the count for each intercepted http request.
  // show spinner
  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      if (req.url != 'assets/i18n/en.json') {
        service_count--;
      }
      if (service_count === 0 || service_count < 0) {
        // hide spinner
        setTimeout(() => {
          // loaderService.hide();
        }, 0);
      }
    })
  );
};
