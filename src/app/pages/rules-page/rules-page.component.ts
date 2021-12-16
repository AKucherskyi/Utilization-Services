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

    {
      id: `metal`,
      title: 'Metal',
      text: `Metal can be recycled. But it is necessary to sort it in advance by type and color.`,
      button: 'Metal recycling services ',
    },

    {
      id: `clothes`,
      title: 'Clothes',
      text: `Most clothing is made of polyester, a material that takes hundreds or even thousands of years to decompose and cannot be recycled. If the clothes are in good condition, turn them over to charity. Throw away unwearable ones, it will go to the landfill. Reduce consumption if possible.`,
      button: 'Clothes recycling services ',
    },

    {
      id: `organic`,
      title: 'Organic',
      text: `  Unfortunately, there are no factories in Russia that process organic raw materials. However, there are services that accept organic waste and recycle it on a non-industrial scale.`,
      button: 'Organic recycling services ',
    },

    {
      id: `e-waste`,
      title: 'E-Waste',
      text: `  Electronic waste is recognized as extremely hazardous to the environment. When exposed to ultraviolet radiation, such debris begins to emit harmful substances into the atmosphere and soil. The good news is that they are disposed of in designated areas.`,
      button: 'E-Waste recycling services ',
    },

    {
      id: `plastic`,
      title: 'Plastic',
      text: `  Polyethylene terephthalate: These are usually bottles with a raised point at the bottom, which sell water, soda, milk, butter. Also from PET are often made transparent bottles for shampoos, disposable food containers. Can be recycled.`,
      button: 'Plastic recycling services ',
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
