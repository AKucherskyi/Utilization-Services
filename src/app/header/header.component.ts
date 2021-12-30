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
  exitButton: boolean = false


  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.auth.isAuthenticated()) {
            const username = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname')
            this.userName$.next(username)
          }
        }
      }
    );
  }

  exitButtonToggle() {
    this.exitButton = !this.exitButton
    setTimeout(() => {
      this.exitButton = false
    },4000)
  }

  logout() {
    this.auth.logout();
    this.exitButton = false; 
    this.router.navigate(['/map'])
  }

}
