import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenusComponent } from '../menus/menus.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule ,ButtonModule,RouterModule,MenusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
