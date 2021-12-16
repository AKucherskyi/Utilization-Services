import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { Feature, Service } from './../../shared/interfaces';
import { MarkerService } from './../../services/marker.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  typeChoosed: boolean = true
  numberRegEx = /\-?\d*\.?\d{1,2}/;

  constructor(private markerService: MarkerService, private router: Router) { 
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(7), Validators.pattern(this.numberRegEx)]),
      plastic: new FormControl(''),
      metal: new FormControl(''),
      paper: new FormControl(''),
      glass: new FormControl(''),
      organic: new FormControl(''),
      batteries: new FormControl('')
    })
  }

  @ViewChild('addressValid') addressValid!: ElementRef

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
    if (!this.selectedFeature) {
        this.addressValid.nativeElement.style.display = 'block'
        return
      }
    

    const types = []

    if (this.form.get('plastic')?.value) {
      types.push('Plastic')
    }
    if (this.form.get('metal')?.value) {
      types.push('Metal')
    }
    if (this.form.get('paper')?.value) {
      types.push('Paper')
    }
    if (this.form.get('glass')?.value) {
      types.push('Glass')
    }
    if (this.form.get('organic')?.value) {
      types.push('Organic')
    }
    if (this.form.get('batteries')?.value) {
      types.push('Batteries')
    }
    
    const typesStr = types.join(' ')
    
    const service = {
      type: typesStr,
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

    typeChanged() {
      if (
        this.form.get('plastic')?.value ||
        this.form.get('metal')?.value ||
        this.form.get('paper')?.value ||
        this.form.get('glass')?.value ||
        this.form.get('organic')?.value ||
        this.form.get('batteries')?.value
      ) {
        this.typeChoosed = true
      } else {
        this.typeChoosed = false
      }
     
    }

}
