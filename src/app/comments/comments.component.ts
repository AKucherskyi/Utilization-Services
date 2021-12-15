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
  formQuestion!: FormGroup;
  waste!: string;
  showComments: boolean = true;
  payment: string = 'free' 

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

    this.formQuestion = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.markerService.currentServiceId$
      .pipe(switchMap((id) => this.markerService.getService(id)))
      .subscribe((service) => {
        this.service = service;
        this.payment = (Math.random() - 0.5) > 0 ? 'paid' : 'free'
      });
  }

  sendComment() {
    if (this.service) {
      this.markerService
        .postComment(this.service.service_id, this.form.value.content)
        .subscribe((comment: Comment) => {
          this.service?.comments?.push(comment);
          this.form.reset();
        });

      if (this.form.value.rating) {
        let deltaRating: number =
          this.form.value.rating - +this.service.rating_quantity;
        if (this.service.rating_quantity != 0) {
          deltaRating = Math.round(deltaRating / 2 + (Math.random() - 0.5));
        }
        console.log(deltaRating);
        if (deltaRating != 0) {
          this.markerService
            .patchRating(this.service.service_id, deltaRating)
            .subscribe((service: Service) => {
              if (this.service) {
                this.service.rating_quantity = service.rating_quantity;
              }
              this.form.reset();
            });
        }
      }
    }
  }

  sendQuestion() {
    if (this.service) {
      this.markerService
        .postQuestion(
          this.service.service_id,
          this.formQuestion.value.description
        )
        .subscribe((question: Comment) => {
          this.service?.questions?.push(question);
          this.formQuestion.reset();
        });
    }
  }
}
