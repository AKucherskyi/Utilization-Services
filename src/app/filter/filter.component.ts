import { MarkerService, TypeOfWaste } from './../services/marker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  plastic: boolean = false
  metal: boolean = false
  paper: boolean = false
  batteries: boolean = false
  glass: boolean = false
  clothes: boolean = false
  lightbulbs: boolean = false
  ewaste: boolean = false
  organic: boolean = false
  firstChange: boolean = true

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
  }

  onToggle (type: TypeOfWaste) {
    if (this.firstChange) {
      this.firstChange = false
      this.markerService.visibility$.next(['plastic', this['plastic']])
      this.markerService.visibility$.next(['metal', this['metal']])
      this.markerService.visibility$.next(['paper', this['paper']])
      this.markerService.visibility$.next(['batteries', this['batteries']])
      this.markerService.visibility$.next(['glass', this['glass']])
      this.markerService.visibility$.next(['clothes', this['clothes']])
      this.markerService.visibility$.next(['lightbulbs', this['lightbulbs']])
      this.markerService.visibility$.next(['ewaste', this['ewaste']])
      this.markerService.visibility$.next(['organic', this['organic']])
    } else {
      this.markerService.visibility$.next([type, this[type]])
    }
    
  }
}
