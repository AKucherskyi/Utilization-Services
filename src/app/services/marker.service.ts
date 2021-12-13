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
    return this.http.get<Service[]>(`${environment.serverUrl}/api/v1/services`).pipe(
    map((response) => {
      return ({
        type: 'FeatureCollection',
        features: response.map((obj) => ({
          type: obj.type.toLowerCase(),
          geometry: {
            type: 'Point',
            coordinates: obj.coordinates
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

  getService(id: string): Observable<Service> {
    return this.http.get<Service>(`${environment.serverUrl}/api/v1/services/${id}`)
  }

  createService(service: any) {
    return this.http.post<Service>(`${environment.serverUrl}/api/v1/services`, service)
  }

  postComment(service_id: string, content: string): Observable<any> {
    return this.http.post<Comment>(`${environment.serverUrl}/api/v1/comments`, {service_id, content})
  }

  patchRating(service_id: string, rating: number = 0): Observable<any> {
    return this.http.patch<Service>(`${environment.serverUrl}/api/v1/services/${service_id}`, {rating_quantity: rating})
  }

  searchWord(query: string): Observable<any> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    return this.http.get<any>(url + query + '.json?type=address&country=ru&access_token=' + environment.mapbox.accessToken)
    .pipe(map(res => res.features))
  }
}
