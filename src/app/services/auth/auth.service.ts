import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { localStorages } from '../../core/helper/localStorage.fun';
import { ILogin } from '../../models/login.model';
import { IUser } from '../../models/user.model';
import { LoaderService } from '../../core/services/loader/loader.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private localStoragesData = localStorages();
  private loaderService = inject(LoaderService);
  constructor(private http: HttpClient) {}
  auth(body: ILogin): Observable<{ UserId: string }> {
    this.loaderService.show();

    return this.http.post<{ UserId: string }>(`https://yalla-neftar.azurewebsites.net/Authorization`, body).pipe(
      tap((res) => {
        const user: IUser = {
          ...body,
          UserId: res.UserId,
        };
        this.localStoragesData.setItem('currentUser', JSON.stringify(user));
      }),
      finalize(() => {
        setTimeout(() => {
          this.loaderService.hide();
        }, 100);
      })
    );
  }

  testProxy(){
    return this.http.get(`jsonplaceholder/todos/1`)
  }



}
