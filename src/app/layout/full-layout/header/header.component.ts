import { Component, inject } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { ILogin } from '../../../models/login.model';
import { localStorages } from '../../../core/helper/localStorage.fun';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user: ILogin = JSON.parse(localStorages().getItem('currentUser'));
  router =  inject(Router)
  localStoragesData = localStorages();
  constructor() {


  }
  onLogout() {
    this.localStoragesData.removeItem('currentUser');
    this.router.navigateByUrl('/auth');
  }
}
