import { GeoJson } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
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
        adress: 'Английский проспект, 26'
      }
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  
  visibility$ = new Subject<[any, any]>()
  markers$ = new BehaviorSubject({})
  geojson!: GeoJson
  

  constructor() {}

  getMarkers(): Observable<GeoJson> {
    return of(geojson)
  }
}
