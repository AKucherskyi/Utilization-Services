import { LoginResponse } from './../shared/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MarkerService, TypeOfWaste } from './../services/marker.service';
import { environment } from '../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from '../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  showComments: boolean = false;
  user!: LoginResponse

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  lat = 59.94;
  lng = 30.32;

  geojson!: GeoJson;

  visibility = {
    plastic: true,
    metal: true,
    paper: true,
    batteries: true,
    glass: true,
    clothes: true,
    lightbulbs: true,
    ewaste: true,
    organic: true,
  };

  favoriteBtnActive: boolean = false

  constructor(private markerService: MarkerService, private router: Router, private auth: AuthService, 
    private cd: ChangeDetectorRef) {}

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat],
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    this.markerService.getMarkers().subscribe((geojson) => {
      console.log(geojson);

      this.geojson = geojson;
      this.renderMarkers();
    });

    this.markerService.visibility$.subscribe(
      ([type, value]: [TypeOfWaste, boolean]) => {
        this.visibility[type] = value;
        this.hide();
        this.show();
      }
    );

    this.auth.getUser().subscribe(user => {
      this.user = user
    })
  }

  hide() {
    for (let type in this.visibility) {
      let markers = document.getElementsByClassName(type);
      for (let i = 0; i < markers.length; i++) {
        if (!this.visibility[type as TypeOfWaste]) {
          (<HTMLElement>markers[i]).style.visibility = 'hidden';
        }
      }
    }
  }

  show() {
    for (let type in this.visibility) {
      let markers = document.getElementsByClassName(type);
      for (let i = 0; i < markers.length; i++) {
        if (this.visibility[type as TypeOfWaste]) {
          (<HTMLElement>markers[i]).style.visibility = 'visible';
        }
      }
    }
  }

  private renderMarkers() {
    if (this.geojson.features) {
      for (const feature of this.geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';
        feature.type = feature.type.map((f: string) => f.replace('-', ''));
        feature.type.forEach((type: string) => {
          el.classList.add(type);
        });

        const popupContent = document.createElement('div');
        let favorite = !!this.user?.favorites?.find(service => service.service_id == feature.properties.id)
        popupContent.innerHTML = `
              <div class="popup-image"></div>
              <div class="popup-description">
              <div class="popup-title">
              <h3>${feature.properties.title}</h3>
                <div class="popup-button-wrapper">
                  <div class=" popup-button ${favorite ? 'popup-button-active' : ''}">
                    <img src="../assets/heart-filled.png" data-btn="favorite">
                  </div>
                </div>
              </div>

              <div class="popup-wrap">
              <p>${feature.properties.description.split(' ').slice(0, 20).join(' ')}</p>

              <div class="popup-details">
                <div>
                <img src="../assets/location.png"/>
                <h4>${feature.properties.adress.split(' ').slice(0, 3).join(' ')}</h4>
                </div>

                <div data-btn="details">
                Details 
                <img src="../assets/east.png"  data-btn="details"/ >
                </div>
              </div>
              
              </div>
              
              
              <div class="rating-result">
                <span ${
                  feature.properties.rating > 0 ? 'class="active"' : ''
                }></span>	
                <span ${
                  feature.properties.rating > 1 ? 'class="active"' : ''
                }></span>    
                <span ${
                  feature.properties.rating > 2 ? 'class="active"' : ''
                }></span>  
                <span ${
                  feature.properties.rating > 3 ? 'class="active"' : ''
                }></span>    
                <span ${
                  feature.properties.rating > 4 ? 'class="active"' : ''
                }></span>
               </div>
                
                
                
                </div>`;

        popupContent.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;        
          if (target.dataset.btn) {
            switch (target.dataset.btn) {
              case 'favorite':
                target.parentElement?.classList.toggle('popup-button-active')
                if (this.user) {
                  this.markerService.toggleFavorite(feature.properties.id).subscribe(response => {
                  localStorage.setItem('user', JSON.stringify(response));
                  })
                }
                break;
              case 'details' :
                this.router.navigate(['/service', feature.properties.id])
                break;  
            }
          }
        });

        let popup = new mapboxgl.Popup({
          offset: 0,
          closeButton: false,
        }).setDOMContent(popupContent);

        let marker = new mapboxgl.Marker(el);

        const markerDiv = marker.getElement();

        markerDiv.addEventListener('click', () => marker.togglePopup());
        // markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
        // markerDiv.addEventListener('click', () =>
        //   this.showServiceComments(feature.properties.id)
        // );

        marker
          .setLngLat(<mapboxgl.LngLatLike>feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(this.map);
      }
    }
  }




  private showServiceComments(id: string) {
    console.log(id);
    this.markerService.currentServiceId$.next(id);
    this.showComments = true;
  }
}
