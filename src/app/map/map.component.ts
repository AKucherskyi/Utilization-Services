import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

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

  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [30.32,59.94 ]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [30.32, 59.84]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

  constructor() {}


  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });

    
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  
    for (const feature of this.geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
    console.log(el);
    
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(<mapboxgl.LngLatLike>feature.geometry.coordinates).addTo(this.map);
    }
  }

  
}
