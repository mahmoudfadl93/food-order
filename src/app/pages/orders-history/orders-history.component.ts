import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { CreateOrderComponent } from '../../components/create-order/create-order.component';
import { OrdersService } from '../../services/orders/orders.service';
import { IOrders } from '../../models/orders.model';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DynamicDialogModule,
  ],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.scss',
})
export class OrdersHistoryComponent implements OnInit {
  dialogService = inject(DialogService);
  ordersService = inject(OrdersService);
  ref: DynamicDialogRef | undefined;
  orders: WritableSignal<IOrders[]> = signal([]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.ordersService.getOrdersList().subscribe({
      next:(res)=>{
        this.orders.set(res)
      }
    })
  }

  show() {
    this.ref = this.dialogService.open(CreateOrderComponent, {
      header: 'Create Order',
      width: '30vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }
}
