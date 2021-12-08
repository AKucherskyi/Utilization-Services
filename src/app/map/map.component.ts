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
      this.geojson = geojson
    })

    if (this.geojson.features) {
      for (const feature of this.geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.classList.add(feature.type)
        new mapboxgl.Marker(el)
          .setLngLat(<mapboxgl.LngLatLike>feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>
                <h4>${feature.properties.adress}</h4>`
              )
          )
          .addTo(this.map);
      }
    }

    this.markerService.plastic$.subscribe(([type, value]) => {
      if (value) {
        this.show(type)
      } else {
        this.hide(type)
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
}
