import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MenusService } from '../../services/menus/menus.service';
import { IMenus } from '../../models/menus-data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  menusService = inject(MenusService);

  menus:WritableSignal<IMenus[]> = signal([]);
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.menusService.getMenus().subscribe({
      next: (res) => {
        this.menus.set(res);
      },
    });
  }

}
