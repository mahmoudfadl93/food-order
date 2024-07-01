import { Component, inject } from '@angular/core';
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
export class OrdersHistoryComponent {
  dialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;
  orders!: any[];
  show() {
    this.ref = this.dialogService.open(CreateOrderComponent, {
      header: 'Create Order',
      width:'30vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
    },
    });
  }
}
