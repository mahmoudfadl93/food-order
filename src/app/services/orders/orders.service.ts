import { Injectable } from '@angular/core';
import { localStorages } from '../../core/helper/localStorage.fun';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user.model';
import { IItemByUser, IOrderItems, IOrders } from '../../models/orders.model';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {
  private user: IUser = JSON.parse(localStorages().getItem('currentUser'));
  constructor(private http: HttpClient) {}

  getOrdersList(): Observable<IOrders[]> {
    return this.http.post<IOrders[]>('api/Orders', {
      userId: this.user.id,
    });
  }

  GetOrderItemsByUser(body: { id: number }): Observable<IItemByUser> {
    return this.http.post<IItemByUser>('api/Orders/GetOrderItemsByUser', {
      userId: this.user.id,
      orderId: body.id,
    });
  }

  GetOrderItems(body: { id: number }): Observable<IOrderItems> {
    return this.http.post<IOrderItems>('api/Orders/GetOrderItems', {
      userId: this.user.id,
      orderId: body.id,
    });
  }
}
