import { Subject } from 'rxjs';
import { MarkerService, TypeOfWaste } from './../services/marker.service';
import { environment } from '../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from '../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  showComments: boolean = false
 
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 59.94;
  lng = 30.32;

  geojson!: GeoJson;

  constructor(private markerService: MarkerService, private router : Router) {}

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat],
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    this.markerService.getMarkers().subscribe((geojson) => {
      console.log(geojson);
      
      this.geojson = geojson;
      this.renderMarkers()
    });

  
    this.markerService.visibility$.subscribe(([type, value]) => {
      if (value) {
        this.show(type);
      } else {
        this.hide(type);
      }
    });
  }

  
  hide(type: TypeOfWaste) {
    let markers = document.getElementsByClassName(type);
    for (let i = 0; i < markers.length; i++) {
      (<HTMLElement>markers[i]).style.visibility = 'hidden';
    }
  }

  show(type: TypeOfWaste) {
    let markers = document.getElementsByClassName(type);
    for (let i = 0; i < markers.length; i++) {
      (<HTMLElement>markers[i]).style.visibility = 'visible';
    }
  }

  private renderMarkers() {
    if (this.geojson.features) {
      for (const feature of this.geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';
        feature.type = feature.type.replace('-','')
        el.classList.add(feature.type);
       

        const popupContent = document.createElement('div');
        popupContent.innerHTML = 
        `<h3>${feature.properties.title}</h3>
              <div class="rating-result">
                <span ${feature.properties.rating > 0 ? 'class="active"' : ''}></span>	
                <span ${feature.properties.rating > 1 ? 'class="active"' : ''}></span>    
                <span ${feature.properties.rating > 2 ? 'class="active"' : ''}></span>  
                <span ${feature.properties.rating > 3 ? 'class="active"' : ''}></span>    
                <span ${feature.properties.rating > 4 ? 'class="active"' : ''}></span>
               </div>
                <div class="options">
                <div>
                  <img id="btn" src="../../assets/phone.png" width="32" height="31" data-id="${feature.properties.id}" />
                  <small>Call</small>
                </div>
                <div>
                  <img src="../../assets/letter.png" width="35" height="26" data-id="${feature.properties.id}"/>
                  <small>Message</small>
                </div>
                <div>
                  <img src="../../assets/comments.png" width="34" height="29" data-id="${feature.properties.id}"/>
                  <small>Comments</small>
                </div>
                </div>
                <p>${feature.properties.description.slice(0, 100) + '...'}</p>
              
                <h4>${feature.properties.adress}</h4>`

                popupContent.addEventListener('click', (e) => {
                  const target = e.target as HTMLElement
                  if (target.dataset.id) {
                    this.showServiceComments(target.dataset.id)
                  }
                  
                })

        let popup = new mapboxgl.Popup({offset: 25, closeButton: false}).setDOMContent(popupContent); 

        let marker = new mapboxgl.Marker(el)

        const markerDiv = marker.getElement();

        markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
        markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
        markerDiv.addEventListener('click', () => this.showServiceComments(feature.properties.id));

        marker
          .setLngLat(<mapboxgl.LngLatLike>feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(this.map);
      }
    }
  }

  private showServiceComments(id: string) {
  
    this.markerService.currentServiceId$.next(id)
    this.showComments = true
    
  }
}
