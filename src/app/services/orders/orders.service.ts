import { inject, Injectable } from '@angular/core';
import { localStorages } from '../../core/helper/localStorage.fun';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user.model';
import { IItemByUser, IOrderItems, IOrders } from '../../models/orders.model';
import { catchError, finalize, Observable } from 'rxjs';
import { LoaderService } from '../../core/services/loader/loader.service';

@Injectable()
export class OrdersService {
  private user: IUser = JSON.parse(localStorages().getItem('currentUser'));
  // loaderService = inject(LoaderService);
  constructor(private http: HttpClient) {}

  getOrdersList(): Observable<IOrders[]> {
    // this.loaderService.show();

    return this.http.post<IOrders[]>('api/Orders', {
      userId: this.user.UserId,
    }).pipe(
      finalize(() => {
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
      }),
      catchError((err)=>{
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
        throw new Error(err)
      })
    )
  }

  GetOrderItemsByUser(body: { id: number }): Observable<IItemByUser> {
    // this.loaderService.show();

    return this.http.post<IItemByUser>('api/Orders/GetOrderItemsByUser', {
      userId: this.user.UserId,
      orderId: body.id,
    }).pipe(
      finalize(() => {
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
      }),
      catchError((err)=>{
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
        throw new Error(err)
      })
    )
  }

  GetOrderItems(body: { id: number }): Observable<IOrderItems> {
    // this.loaderService.show();

    return this.http.post<IOrderItems>('api/Orders/GetOrderItems', {
      userId: this.user.UserId,
      orderId: body.id,
    }).pipe(
      finalize(() => {
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
      }),
      catchError((err)=>{
        setTimeout(() => {
          // this.loaderService.hide();
        }, 100);
        throw new Error(err)
      })
    )
  }
}
