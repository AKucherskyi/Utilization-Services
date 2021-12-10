import { MarkerService, TypeOfWaste } from './../services/marker.service';
import { environment } from '../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from '../shared/interfaces';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 59.94;
  lng = 30.32;

  geojson!: GeoJson;

  constructor(private markerService: MarkerService) {}

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
      this.geojson = geojson;
    });

    if (this.geojson.features) {
      for (const feature of this.geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.classList.add(feature.type);
        new mapboxgl.Marker(el)
          .setLngLat(<mapboxgl.LngLatLike>feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
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
                  <img id="btn" src="../../assets/phone.png" width="32" height="31" />
                  <small>Call</small>
                </div>
                <div>
                  <img src="../../assets/letter.png" width="35" height="26" />
                  <small>Message</small>
                </div>
                <div>
                  <img src="../../assets/comments.png" width="34" height="29" />
                  <small>Comments</small>
                </div>
                </div>
                <p>${feature.properties.description}</p>
                <h4>Бесплатно</h4>
                <p>${feature.properties.adress}</p>`
            )
          )
          .addTo(this.map);
      }
      
    }

    this.markerService.visibility$.subscribe(([type, value]) => {
      if (value) {
        this.show(type);
      } else {
        this.hide(type);
      }
    });
  }

  log() {
    console.log('Click');
    
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
}
