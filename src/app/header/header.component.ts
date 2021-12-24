import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName$ = new BehaviorSubject<string>('')

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.userName$.next(localStorage.getItem('username') as string)
    }
  }

}
