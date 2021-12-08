import { MarkerService } from './../services/marker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  plastic!: boolean

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
  }

  onToggle () {
    this.markerService.plastic$.next(this.plastic)
  }
}
