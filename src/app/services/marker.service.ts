import { environment } from './../../environments/environment';
import { GeoJson, Service } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export type TypeOfWaste = 'plastic' | 'metal' | 'paper' | 'battery' | 'glass' | 'danger'

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'danger',
      geometry: {
        type: 'Point',
        coordinates: [30.33,59.93 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'danger',
      geometry: {
        type: 'Point',
        coordinates: [30.30,59.90 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'plastic',
      geometry: {
        type: 'Point',
        coordinates: [30.32,59.94 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'plastic',
      geometry: {
        type: 'Point',
        coordinates: [30.32, 59.84]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'plastic',
      geometry: {
        type: 'Point',
        coordinates: [30.31, 59.87]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'metal',
      geometry: {
        type: 'Point',
        coordinates: [30.33,59.91 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'paper',
      geometry: {
        type: 'Point',
        coordinates: [30.40, 59.90]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'paper',
      geometry: {
        type: 'Point',
        coordinates: [30.38,59.96 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'paper',
      geometry: {
        type: 'Point',
        coordinates: [30.42,59.91 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'glass',
      geometry: {
        type: 'Point',
        coordinates: [30.43,59.87 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'glass',
      geometry: {
        type: 'Point',
        coordinates: [30.35,59.98 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'battery',
      geometry: {
        type: 'Point',
        coordinates: [30.47,59.88 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'battery',
      geometry: {
        type: 'Point',
        coordinates: [30.30,60.01 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'metal',
      geometry: {
        type: 'Point',
        coordinates: [30.40,59.99 ]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    },
    {
      type: 'metal',
      geometry: {
        type: 'Point',
        coordinates: [30.42, 59.89]
      },
      properties: {
        title: '«Раздельный сбор»',
        description: 'пластик, металл, макулатура',
        adress: 'Английский проспект, 26',
        rating: 4
      }
    }
  ]
};

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
          type: obj.type,
          geometry: {
            type: 'Point',
            coordinates: obj.coordinates.map((x: string) => parseFloat(x))
          },
          properties: {
            title: obj.description,
            description: obj.summary,
            adress: '',
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
