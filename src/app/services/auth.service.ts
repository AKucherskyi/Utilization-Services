import { LoginResponse } from './../shared/interfaces';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    public googleService: SocialAuthService
  ) {}

  get token(): string | null {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.serverUrl}/api/v1/login`, { email, password })
      .pipe(
        tap((response: LoginResponse) => {
          this.setToken(response);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  register(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/api/v1/register`, {
      email,
      password,
      firstname,
      lastname,
    });
  }

  logout() {
    localStorage.clear();
    this.signOut();
  }

  public signInWithGoogle(): Observable<any> {
    return this.googleService.authState.pipe(
      tap((user) => {
        console.log(user);
        
        if (user) {
          localStorage.setItem('token', user.idToken);
          localStorage.setItem('firstname', user.firstName);
          localStorage.setItem('lastname', user.lastName);
          // localStorage.setItem('user_id', response.user_id)
        }
        
      })
    );
  }

  public signOut(): void {
    this.googleService.signOut();
  }

  private setToken(response: LoginResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('firstname', response.firstname);
    localStorage.setItem('lastname', response.lastname);
    localStorage.setItem('user_id', response.user_id);
  }
}
