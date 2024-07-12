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
  providers:[MenusService],
  templateUrl: './dialog-create-menu.component.html',
  styleUrl: './dialog-create-menu.component.scss',
})
export class DialogCreateMenuComponent implements OnInit {
  menusService = inject(MenusService);
  subscription = new Subscriptions();
  id!: number;
  name!: string;
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      items: new FormArray([]),
    });
    this.addItem();
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

  onSubmit() {}

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
