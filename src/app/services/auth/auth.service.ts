import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { localStorages } from '../../core/helper/localStorage.fun';
import { ILogin } from '../../models/login.model';
import { IUser } from '../../models/user.model';
import { LoaderService } from '../../core/services/loader/loader.service';

@Injectable()
export class AuthService {
  localStoragesData = localStorages();
  // loaderService = inject(LoaderService);
  constructor(private http: HttpClient) {}
  auth(body: ILogin): Observable<{id:string}> {
    // this.loaderService.show();

    return this.http.post<{id:string}>('api/Authorization', body).pipe(
      tap((res) => {
        debugger
        const user: IUser = {
          ...body,
          id: res.id,
        };
        this.localStoragesData.setItem('currentUser', JSON.stringify(user));
      }),
      finalize(() => {
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
      }),
      catchError((err) => {
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
        throw new Error(err);
      })
    );
  }
}
