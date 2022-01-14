import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeimg',
})
export class TypeImgPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (!value) return ''
    value = value.split(' ')[0];
    switch (value) {
      case 'Plastic':
        return '../../assets/types-of-waste-img/plastic.jpg';
        break;

      case 'Metal':
        return '../../assets/types-of-waste-img/metal.jpg';
        break;

      case 'Paper':
        return '../../assets/types-of-waste-img/paper.jpg';
        break;

      case 'Batteries':
        return '../../assets/types-of-waste-img/batteries.jpg';
        break;

      case 'Glass':
        return '../../assets/types-of-waste-img/glass.jpg';
        break;

      case 'Clothes':
        return '../../assets/types-of-waste-img/clothes.jpg';
        break;

      case 'Light-bulbs':
        return '../../assets/types-of-waste-img/light-bulbs.jpg';
        break;

      case 'E-waste':
        return '../../assets/types-of-waste-img/e-waste.jpg';
        break;

      case 'Organic':
        return '../../assets/types-of-waste-img/organic.jpg';
        break;

      default:
        return '../../assets/types-of-waste-img/multi.jpg';
        break;
    }
  }
}
