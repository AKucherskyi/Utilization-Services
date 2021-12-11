import { environment } from './../../environments/environment';
import { GeoJson, Service } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export type TypeOfWaste = 'plastic' | 'metal' | 'paper' | 'batteries' | 'glass' | 'clothes' | 'lightbulbs' | 'ewaste' | 'organic'

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  currentServiceId$: Subject<string> = new Subject()
  visibility$ = new Subject<[any, any]>()
  markers$ = new BehaviorSubject({})
  geojson!: GeoJson
  

  constructor(private http: HttpClient) {
  }

  getMarkers(): Observable<any> {
    return this.http.get<any[]>(`${environment.serverUrl}/api/v1/services`).pipe(
    map((response) => {
      return ({
        type: 'FeatureCollection',
        features: response.map((obj) => ({
          type: obj.type.toLowerCase(),
          geometry: {
            type: 'Point',
            coordinates: obj.coordinates.map((x: string) => parseFloat(x))
          },
          properties: {
            title: obj.summary,
            description: obj.description,
            adress: obj.address,
            rating: obj.rating_quantity,
            id: obj.service_id
          }
        }))
      })
      
    })
    )
    // return of(geojson)
  }

  getService(id: string) {
    return this.http.get<Service>(`${environment.serverUrl}/api/v1/services/${id}`)
  }
}
