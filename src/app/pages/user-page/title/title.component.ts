import { LoginResponse } from './../../../shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
 
  @Input() user!: LoginResponse | null

  constructor() { }

  ngOnInit(): void {
    
  }

}
