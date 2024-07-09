import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Subscriptions } from '../../shared/utilities/subscription.class';
import { MenusService } from '../../services/menus/menus.service';

@Component({
  selector: 'app-menu-create-edit',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './menu-create-edit.component.html',
  styleUrl: './menu-create-edit.component.scss',
})
export class MenuCreateEditComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  menusService = inject(MenusService);

  subscription = new Subscriptions();
  id!: number;
  name!: string;
  form!: FormGroup;
  ngOnInit(): void {
    this.subscription.add = this.activatedRoute.params.subscribe((param) => {
      this.id = +param['id'];
      this.name = param['name'];
      if (this.id) {
        this.loadData();
      }

    });
    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      items: new FormArray([]),
    });
    this.addItem();
  }
  loadData() {
    this.menusService.getMenuDetails({ id: this.id }).subscribe({
      next: (res) => {
        this.formControl('id').setValue(this.id);
        this.formControl('name').setValue(this.name);
        this.formControl('items').setValue(res);
      },
    });
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
