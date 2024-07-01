import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements OnInit {
  form!: FormGroup;
  menus=[]
  ngOnInit(): void {
    this.form = new FormGroup({
      menu: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(){

  }
}
