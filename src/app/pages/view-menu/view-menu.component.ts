import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriptions } from '../../shared/utilities/subscription.class';
import { MenusService } from '../../services/menus/menus.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { IMenuDetails } from '../../models/menu-details.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogCreateMenuComponent } from '../../components/dialog-create-menu/dialog-create-menu.component';

@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [ButtonModule, TableModule, CardModule, CommonModule],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss',
})
export class ViewMenuComponent {
  dialogService = inject(DialogService);
  id!: number;
  menus: WritableSignal<IMenuDetails> = signal(null!);
  ref: DynamicDialogRef | undefined;
  subscription = new Subscriptions();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _MenusService: MenusService
  ) {
    this.subscription.add = this.activatedRoute.params.subscribe((param) => {
      this.id = +param['id'];

      if (this.id) {
        this.loadData();
      }
    });
  }
  loadData() {
    this.subscription.add = this._MenusService
      .getMenuDetails({ id: this.id })
      .subscribe({
        next: (res) => {
          this.menus.set(res);
        },
      });
  }

  show() {
    this.ref = this.dialogService.open(DialogCreateMenuComponent, {
      header: 'Create Menu',
      width: '50vw',
      data: {
        menuId: this.id,
        menuName: this.menus().Name,
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    this.ref.onClose.subscribe((dailogRes) => {
      if (dailogRes?.isSave) {
        this.loadData();
      }
    });
  }
}
