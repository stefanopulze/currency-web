import { Pipe, PipeTransform } from '@angular/core';
import {months} from './months.constants';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return months[value - 1];
  }

}

