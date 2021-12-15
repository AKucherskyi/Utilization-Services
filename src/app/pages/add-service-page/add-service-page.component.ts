import { Router } from '@angular/router';
import { Feature, Service } from './../../shared/interfaces';
import { MarkerService } from './../../services/marker.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounce, debounceTime, switchMap } from 'rxjs/operators';
import { interval, of } from 'rxjs';

@Component({
  selector: 'app-add-service-page',
  templateUrl: './add-service-page.component.html',
  styleUrls: ['./add-service-page.component.scss']
})
export class AddServicePageComponent implements OnInit {
  features: Feature[] = []
  selectedFeature!: Feature
  form!: FormGroup

  constructor(private markerService: MarkerService, private router: Router) { 
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(7)]),
      type: new FormControl('Raw material type', Validators.maxLength(15))
    })
  }

  ngOnInit(): void {
    this.form.get('address')?.valueChanges.pipe(
      debounceTime(1000),
      switchMap(() =>  {
        if (this.form.value.address.length > 0) {
          return this.markerService.searchWord(this.form.value.address.toLowerCase())
        } else {
          return of([])
        }
      }

      )
    ).subscribe((features: any) => {
          this.features = features
        })
  }

  onSelect(feature: Feature) {
    this.selectedFeature = feature
    this.features = []
  }

  submit() {
    const service = {
      type: this.form.value.type,
      address: this.selectedFeature.place_name,
      summary: this.form.value.name,
      description: this.form.value.description,
      coordinates: this.selectedFeature.center,
      phone_number: +this.form.value.number
    }
    console.log(service);
    
    this.markerService.createService(service).subscribe((service) => {
      console.log(service);
      this.router.navigate(['/map'])
    })
    
  }


}
