import { LoginResponse } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user!: LoginResponse | null

  constructor() { }

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user') as string)
  }

}
