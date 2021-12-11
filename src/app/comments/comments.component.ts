import { concatMap, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MarkerService } from './../services/marker.service';
import { Service } from './../shared/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [trigger('enterAnimation', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('250ms', style({ transform: 'translateX(0)', opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('150ms', style({ opacity: 0 })),
    ]),
  ])]
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
