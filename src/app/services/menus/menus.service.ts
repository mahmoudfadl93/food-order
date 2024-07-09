import { Injectable } from '@angular/core';
import { localStorages } from '../../core/helper/localStorage.fun';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenus } from '../../models/menus-data.model';
import { IUser } from '../../models/user.model';

@Injectable()
export class MenusService {
  private user: IUser = JSON.parse(localStorages().getItem('currentUser'));
  constructor(private http: HttpClient) {}

  getMenus(): Observable<IMenus[]> {
    return this.http.post<IMenus[]>('api/Menus/GetMenus', {
      userId: this.user.id,
    });
  }

  getMenuDetails(body: { id: number }): Observable<any> {
    return this.http.post<any>('api/Menus/GetMenuItems', {
      menuId: body.id,
    });
  }
}
