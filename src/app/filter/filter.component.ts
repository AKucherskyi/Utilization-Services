import { Router } from '@angular/router';
import { MarkerService, TypeOfWaste } from './../services/marker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  plastic: boolean = false;
  metal: boolean = false;
  paper: boolean = false;
  batteries: boolean = false;
  glass: boolean = false;
  clothes: boolean = false;
  lightbulbs: boolean = false;
  ewaste: boolean = false;
  organic: boolean = false;

  constructor(private markerService: MarkerService, public router: Router) {}

  ngOnInit(): void {}

  onToggle(type: TypeOfWaste) {
    if (
      !this.plastic &&
      !this.metal &&
      !this.paper &&
      !this.batteries &&
      !this.glass &&
      !this.clothes &&
      !this.lightbulbs &&
      !this.ewaste &&
      !this.organic
    ) {
      this.markerService.visibility$.next(['plastic', true]);
      this.markerService.visibility$.next(['metal', true]);
      this.markerService.visibility$.next(['paper', true]);
      this.markerService.visibility$.next(['batteries', true]);
      this.markerService.visibility$.next(['glass', true]);
      this.markerService.visibility$.next(['clothes', true]);
      this.markerService.visibility$.next(['lightbulbs', true]);
      this.markerService.visibility$.next(['ewaste', true]);
      this.markerService.visibility$.next(['organic', true]);
    } else {
      this.markerService.visibility$.next(['plastic', this['plastic']]);
      this.markerService.visibility$.next(['metal', this['metal']]);
      this.markerService.visibility$.next(['paper', this['paper']]);
      this.markerService.visibility$.next(['batteries', this['batteries']]);
      this.markerService.visibility$.next(['glass', this['glass']]);
      this.markerService.visibility$.next(['clothes', this['clothes']]);
      this.markerService.visibility$.next(['lightbulbs', this['lightbulbs']]);
      this.markerService.visibility$.next(['ewaste', this['ewaste']]);
      this.markerService.visibility$.next(['organic', this['organic']]);
    }
  }
}
