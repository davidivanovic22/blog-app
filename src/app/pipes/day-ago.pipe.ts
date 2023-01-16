import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dayAgo'
})
export class DayAgoPipe implements PipeTransform {

  transform(day: string, ...args: unknown[]): unknown {
    return moment(new Date(day)).startOf('day').fromNow();
  }

}
