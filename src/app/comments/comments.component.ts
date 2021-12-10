import { concatMap, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MarkerService } from './../services/marker.service';
import { Service } from './../shared/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  service!: Service

  @Output() close: EventEmitter<any> = new EventEmitter()

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {

    this.markerService.currentServiceId$.pipe(
      switchMap((id) => this.markerService.getService(id))
    )
    .subscribe((service) => {
      this.service = service
    })    
  }

}
