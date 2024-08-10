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
import { MenusService } from '../../services/menus/menus.service';
import { IMenus } from '../../models/menus-data.model';
import { CommonModule } from '@angular/common';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogCreateMenuComponent } from '../../components/dialog-create-menu/dialog-create-menu.component';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DynamicDialogModule,
  ],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  menusService = inject(MenusService);
  dialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;
  menus: WritableSignal<IMenus[]> = signal([]);
  constructor(){
    this.loadData();
  }
  ngOnInit() {

  }
  loadData() {
    this.menusService.getMenus().subscribe({
      next: (res) => {
        this.menus.set(res);
      },
    });
  }

  show() {
    this.ref = this.dialogService.open(DialogCreateMenuComponent, {
      header: 'Create Menu',
      width: '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }
}
