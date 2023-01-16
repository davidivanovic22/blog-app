import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../models/link';
import { isNumeric } from '../utils/utilility';

@Pipe({
  name: 'paginationClear'
})
export class PaginationClearPipe implements PipeTransform {

  transform(links: Link[], ...args: unknown[]): unknown {
    return links?.filter(link => isNumeric(link.label));
  }

}
