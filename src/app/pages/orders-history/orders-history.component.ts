import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule,CommonModule],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.scss',
})
export class OrdersHistoryComponent {
  orders!:any[]
}
