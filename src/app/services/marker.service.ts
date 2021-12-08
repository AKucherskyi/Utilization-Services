import { GeoJson } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'plastic',
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
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [30.40, 59.90]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [30.42, 59.89]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  
  plastic$ = new BehaviorSubject(false)
  markers$ = new BehaviorSubject({})
  geojson!: GeoJson
  

  constructor() {
    this.plastic$.subscribe((value) => {
      if (value) {
        this.markers$.next(geojson)
      } else {
        this.markers$.next({})
      }
    })
   }

  getMarkers(): Observable<GeoJson> {
    return of(geojson)
  }
}
