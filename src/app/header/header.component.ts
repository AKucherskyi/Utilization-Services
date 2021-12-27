import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName$ = new BehaviorSubject<string>('')
  lightShadow: boolean = false

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.auth.isAuthenticated()) {
            this.userName$.next(localStorage.getItem('username') as string)
          }
          if (this.router.url.includes('auth') || this.router.url.includes('user')) {
            this.lightShadow = true
          } else {
            this.lightShadow = false
          }
        }
      }
    );
    
   
  }

}
