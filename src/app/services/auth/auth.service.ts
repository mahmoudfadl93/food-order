import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { localStorages } from '../../core/helper/localStorage.fun';
import { ILogin } from '../../models/login.model';
import { IUser } from '../../models/user.model';

@Injectable()
export class AuthService {
  localStoragesData = localStorages();
  constructor(private http: HttpClient) {}
  auth(body: ILogin): Observable<number> {
    return this.http.post<number>('api/Authorization', body).pipe(
      tap((res) => {
        const user : IUser = {
          ...body,
          id: res,
        };
        this.localStoragesData.setItem('currentUser', JSON.stringify(user));
      })
    );
  }
}
