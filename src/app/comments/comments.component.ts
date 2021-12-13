import { concatMap, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MarkerService } from './../services/marker.service';
import { Service, Comment } from './../shared/interfaces';
import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('350ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class CommentsComponent implements OnInit, AfterViewChecked {
  service!: Service | null;
  form!: FormGroup;
  waste!: string;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('list') list!: ElementRef;

  constructor(private markerService: MarkerService) {}

  ngAfterViewChecked(): void {
    if (this.list) {
      this.list.nativeElement.scrollTop = 9999;
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      rating: new FormControl(''),
    });

    
    

    this.markerService.currentServiceId$
      .pipe(switchMap((id) => this.markerService.getService(id)))
      .subscribe((service) => {
        this.service = service;
        console.log(service?.rating_quantity);
      });
  }

  sendComment() {
    if (this.service) {
      this.markerService
        .postComment(this.service.service_id, this.form.value.content)
        .subscribe((comment: Comment) => {
          this.service?.comments?.push(comment);
        });
      this.markerService
        .patchRating(this.service.service_id, this.form.value.rating)
        .subscribe((service: Service) => {
          if (this.service) {
            this.service.rating_quantity = service.rating_quantity
          }
          this.form.reset();
        });
    }
  }
}
