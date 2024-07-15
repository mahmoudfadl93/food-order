import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';

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
    this._AuthService.auth(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl(this.returnUrl);
      },
    });
  }
}
