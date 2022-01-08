import { environment } from './../../../environments/environment';
import { RegisterResponse, GoogleAuthResponse } from './../../shared/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  form!: FormGroup;
  error$: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.clientId,
      callback: (response: GoogleAuthResponse) => {
        this.zone.run(() => {this.signInWithGoogle(response)})
      }
    });
    google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
      theme: 'outline',
      size: 'large',
      width: '420',
    });
    google.accounts.id.prompt();
  }


  signInWithGoogle(response: GoogleAuthResponse) {
    this.auth.signInWithGoogle(response.credential).subscribe(
      () => {
        this.router.navigate(['/user']);
      },
      (err) => {
        this.error$.next(err.error.message);
      }
    );

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.auth.login(this.form.value.email, this.form.value.password).subscribe(
      () => {
        this.router.navigate(['/user']);
      },
      (err) => {
        this.error$.next(err.error.message);
      }
    );
  }
}
