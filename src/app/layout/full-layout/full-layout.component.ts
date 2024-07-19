import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  providers: [],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss',
})
export class FullLayoutComponent {}
