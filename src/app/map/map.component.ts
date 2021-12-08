import { MarkerService } from './../services/marker.service';
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
          .addTo(this.map);
      }
    }

    this.markerService.plastic$.subscribe((value) => {
      console.log(value);
      if (value) {
        this.show()
      } else {
        this.hide()
      }
    });
  }

  
  hide() {
    let markers = document.getElementsByClassName('plastic');
    for (let i = 0; i < markers.length; i++) {
      (<HTMLElement>markers[i]).style.visibility = 'hidden';
    }
  }

  show() {
    let markers = document.getElementsByClassName('plastic');
    for (let i = 0; i < markers.length; i++) {
      (<HTMLElement>markers[i]).style.visibility = 'visible';
    }
  }
}
