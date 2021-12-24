import { RegisterResponse } from './../../shared/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [AuthService],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  form!: FormGroup;
  error$: Subject<string> = new Subject<string>()

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
        action: ['signin'],
        username: [''],
      },
      { validators: this.passwordValidator }
    );
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    switch (this.form.value.action) {
      case 'signin':
        this.auth
          .login(this.form.value.email, this.form.value.password)
          .subscribe(
            (response) => {
              console.log(response);
              this.router.navigate(['/home']);
            },
            (err) => {
              this.error$.next(err.error.message)
            }
          );
        break;
      case 'signup':
        this.auth
          .register(
            this.form.value.email,
            this.form.value.password,
            this.form.value.username
          )
          .subscribe((response: RegisterResponse) => {
            this.auth
          .login(this.form.value.email, this.form.value.password)
          .subscribe(
            () => {
              this.form.reset();
            })
          });
        break;
    }   
  }

  private passwordValidator(group: AbstractControl): ValidationErrors | null {
    if (group.get('action')?.value == 'signup') {
      let pass = group.get('password')?.value;
      let confirmPass = group.get('confirmPassword')?.value;
      return pass === confirmPass ? null : { notSame: true };
    } else {
      return null;
    }
  }
}
