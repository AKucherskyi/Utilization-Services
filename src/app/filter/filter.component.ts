import { MarkerService, TypeOfWaste } from './../services/marker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  plastic: boolean = true
  metal: boolean = true
  paper: boolean = true
  battery: boolean = true
  glass: boolean = true
  danger: boolean = true

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
  }

  onToggle (type: TypeOfWaste) {
    this.markerService.visibility$.next([type, this[type]])
  }
}
