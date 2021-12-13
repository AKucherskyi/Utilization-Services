import { MarkerService } from './../../services/marker.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-add-service-page',
  templateUrl: './add-service-page.component.html',
  styleUrls: ['./add-service-page.component.scss']
})
export class AddServicePageComponent implements OnInit {
  features: any = []
  form!: FormGroup

  constructor(private markerService: MarkerService) { 
    this.form = new FormGroup({
      address: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      number: new FormControl('')
    })
  }

  ngOnInit(): void {
    // this.form.get('address')?.valueChanges.pipe(
    //   debounce(1000)
    // )
  }

  search() {
    if (this.form.value.address) {
      this.markerService.searchWord(this.form.value.address.toLowerCase()).subscribe((features: any) => {
        this.features = features
      })
    } else {
      this.features = []
    }
  }

}
