import { inject, Injectable } from '@angular/core';
import { localStorages } from '../../core/helper/localStorage.fun';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable } from 'rxjs';
import { IMenus } from '../../models/menus-data.model';
import { IUser } from '../../models/user.model';
import { LoaderService } from '../../core/services/loader/loader.service';
import { IAddMenu } from '../../models/addMenu.model';
import { IAddMenuItem } from '../../models/addMenuItems.model';

@Injectable()
export class MenusService {
  private user: IUser = JSON.parse(localStorages().getItem('currentUser'));

  constructor(
    private http: HttpClient,
    private _LoaderService: LoaderService
  ) {}

  getMenus(): Observable<IMenus[]> {
    this._LoaderService.show();
    return this.http
      .post<IMenus[]>('/api/Menus/GetMenus', {
        userId: this.user.UserId,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this._LoaderService.hide();
          }, 100);
        })
      );
  }

  getMenuDetails(body: { id: number }): Observable<any> {
    this._LoaderService.show();
    return this.http
      .post<any>('/api/Menus/GetMenuItems', {
        menuId: body.id,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this._LoaderService.hide();
          }, 100);
        })
      );
  }

  AddMenu(body: IAddMenu): Observable<number> {
    this._LoaderService.show();
    return this.http.post<number>('/api/Menus/AddMenu', body).pipe(
      finalize(() => {
        setTimeout(() => {
          this._LoaderService.hide();
        }, 100);
      })
    );
  }

  AddMenuItem(body: IAddMenuItem): Observable<number> {
    this._LoaderService.show();
    return this.http.post<number>('/api/Menus/AddMenuItem', body).pipe(
      finalize(() => {
        setTimeout(() => {
          this._LoaderService.hide();
        }, 100);
      })
    );
  }
}
