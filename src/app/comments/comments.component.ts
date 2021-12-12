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
import { FormControl, FormGroup } from '@angular/forms';

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
      content: new FormControl(''),
    });

    this.markerService.currentServiceId$
      .pipe(switchMap((id) => this.markerService.getService(id)))
      .subscribe((service) => {
        this.service = service;
      });
  }

  sendComment() {
    if (this.service) {
      this.markerService
        .postComment(this.service.service_id, this.form.value.content)
        .subscribe((comment: Comment) => {
          this.form.reset();
          this.service?.comments?.push(comment);
        });
    }
  }
}
