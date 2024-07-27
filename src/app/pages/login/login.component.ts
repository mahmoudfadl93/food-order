import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    FloatLabelModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    CommonModule,
    MessagesModule,
    ErrorMessageComponent,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private _AuthService: AuthService
  ) {}
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    // Handle form submission here
    if (this.loginForm.invalid) return;
    const email: string = this.formControl('email').value;
    if (
      !email.toLowerCase().includes('EFG-Hermes.com') ||
      !email.toLowerCase().includes('efghldg.com')
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email should be your work mail',
      });
      // return;
    }
    this._AuthService.auth(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl(this.returnUrl);
      },
    });
  }

  formControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
}
