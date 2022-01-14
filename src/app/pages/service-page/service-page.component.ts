import { Service } from './../../shared/interfaces';
import { MarkerService } from './../../services/marker.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  service!: Service

  constructor(private route: ActivatedRoute, private markerService: MarkerService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.markerService.getService(params['id']))
    )
    .subscribe(service => {
      this.service = service
      console.log(this.service);
    })
  }

  whatsapp() {
    this.markerService.whatsapp(this.service.service_id).subscribe(response => {
      console.log(response);
      
    })
  }

}
