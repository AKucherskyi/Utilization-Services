import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterResponse } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.auth
      .register(
        this.form.value.email,
        this.form.value.password,
        this.form.value.firstName,
        this.form.value.lastName
      )
      .subscribe((response: RegisterResponse) => {
        this.auth
          .login(this.form.value.email, this.form.value.password)
          .subscribe(() => {
            this.form.reset();
            this.router.navigate(['/user']);
          });
      });
  }
}
