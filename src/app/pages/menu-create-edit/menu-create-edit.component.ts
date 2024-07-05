import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-menu-create-edit',
  standalone: true,
  imports: [CardModule,ButtonModule, ReactiveFormsModule,InputTextModule ,InputNumberModule ],
  templateUrl: './menu-create-edit.component.html',
  styleUrl: './menu-create-edit.component.scss'
})
export class MenuCreateEditComponent implements OnInit {


  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  form!: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      items: new FormArray([]),
    });
    this.addItem()
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

  onSubmit(){

  }

  // Helper method to get the 'items' FormArray
  get items() {
    return this.form.get('items') as FormArray;
  }
}
