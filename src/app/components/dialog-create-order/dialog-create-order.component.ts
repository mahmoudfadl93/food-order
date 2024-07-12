import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dialog-create-order',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './dialog-create-order.component.html',
  styleUrl: './dialog-create-order.component.scss'
})
export class DialogCreateOrderComponent {
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
