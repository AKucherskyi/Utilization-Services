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
  batteries: boolean = true
  glass: boolean = true
  clothes: boolean = true
  lightbulbs: boolean = true
  ewaste: boolean = true
  organic: boolean = true

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
  }

  onToggle (type: TypeOfWaste) {
    this.markerService.visibility$.next([type, this[type]])
  }
}
