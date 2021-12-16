import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss'],
})
export class RulesPageComponent implements OnInit {
  showButton: boolean = false

  data = [
    {
      id: `light-bulbs`,
      title: 'Light bulbs',
      text: `There are dozens of companies in the country with licenses for hazardous waste management.
      You can send lamps to special services and be sure that they will not harm the environment.`,
      button: 'Light bulbs recycling services ',
    },

    {
      id: `batteries`,
      title: 'Batteries',
      text: `Batteries are very dangerous. One battery pollutes 20 square meters of land. This impact on the environment is carried out by means of heavy metals.
      The good news is that 95% of every battery and lamp is recyclable and reusable. They must be handed over in specially designated places.`,
      button: 'Batteries recycling services ',
    },
  ];

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: Event): void => {
  if (window.scrollY > 500) {
    this.showButton = true
  } else {
    this.showButton = false
  }
  
  };
}
