import { LoginResponse } from './../../../shared/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
 
  @Input() user!: LoginResponse | null
  @Output() dialog: EventEmitter<any> = new  EventEmitter()

  constructor() { }

  ngOnInit(): void {
    
  }

  changePassword() {
    this.dialog.emit(null)
  }

}
