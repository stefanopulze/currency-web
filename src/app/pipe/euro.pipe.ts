import { Pipe, PipeTransform } from '@angular/core';
import NumberFormat = Intl.NumberFormat;

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  numberFormat: NumberFormat;

  constructor() {
    this.numberFormat = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
  }


  transform(value: any, args?: any): any {
    return this.numberFormat.format(value);
  }

}
