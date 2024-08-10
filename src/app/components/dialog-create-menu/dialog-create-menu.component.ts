import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';

import { MenusService } from '../../services/menus/menus.service';
import { Subscriptions } from '../../shared/utilities/subscription.class';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ItemsList } from '../../models/addMenuItems.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-create-menu',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
  ],
  providers: [],
  templateUrl: './dialog-create-menu.component.html',
  styleUrl: './dialog-create-menu.component.scss',
})
export class DialogCreateMenuComponent implements OnInit {
  menusService = inject(MenusService);
  subscription = new Subscriptions();
  id!: number;
  name!: string;
  form!: FormGroup;
  constructor(
    public config: DynamicDialogConfig<any>,
    public ref: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      items: new FormArray([]),
    });

    this.id = this.config.data.menuId;
    this.name = this.config.data.menuName;
    this.formControl('id').setValue(this.id);
    this.formControl('name').setValue(this.name);
  }

  addItem() {
    const item = new FormGroup({
      // Define your form controls here
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });

    // Add the new form group to the FormArray
    this.items.push(item);
  }

  onSubmit() {
    if (!this.id) {
      this.menusService
        .AddMenu({
          name: this.formControl('name').value,
        })
        .subscribe({
          next: (res) => {
            const items: [] = this.formControl('items').value;
            if (items.length) {
              const data = items.map((item: ItemsList) => {
                return {
                  ...item,
                  menuId: res,
                };
              });
              this.menusService.AddMenuItem({ itemsList: data }).subscribe({
                next: (_) => {
                  if (this.ref) {
                    this.ref.close({
                      isSave:true
                    });
                  }
                },
              });
            } else {
              if (this.ref) {
                this.ref.close({
                  isSave:true
                });
              }
            }
          },
        });
    } else {
      const items: [] = this.formControl('items').value;
      if (items.length) {
        const data = items.map((item: ItemsList) => {
          return {
            ...item,
            menuId: this.id,
          };
        });
        this.menusService.AddMenuItem({ itemsList: data }).subscribe({
          next: (_) => {
            if (this.ref) {
              this.ref.close({
                isSave:true
              });
            }
          },
        });
      }
    }
  }

  // Helper method to get the 'items' FormArray
  get items() {
    return this.form.get('items') as FormArray;
  }
  formControl(name: string) {
    return this.form.get(name) as FormControl;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
