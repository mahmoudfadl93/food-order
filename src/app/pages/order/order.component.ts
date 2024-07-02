import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CardModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  menuItems = [];
  form!: FormGroup;
  cartList=[
    {
      name:'fol',
      quantity:1,
      price:30,
      totalPrice:30,
    }
  ]
  ngOnInit(): void {
    this.form = new FormGroup({
      items: new FormArray([]),
    });
    this.addItem();
  }

  addItem() {
    const item = new FormGroup({
      // Define your form controls here
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      quantity: new FormControl(null, [Validators.required]),
    });

    // Add the new form group to the FormArray
    this.items.push(item);
  }

  Done() {}
  submit(){}

  // Helper method to get the 'items' FormArray
  get items() {
    return this.form.get('items') as FormArray;
  }
}
