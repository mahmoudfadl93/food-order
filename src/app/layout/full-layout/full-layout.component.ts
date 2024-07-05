import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { MenusService } from '../../services/menus/menus.service';

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  providers:[MenusService],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss'
})
export class FullLayoutComponent {

}
