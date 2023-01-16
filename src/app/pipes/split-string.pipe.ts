import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString'
})
export class SplitStringPipe implements PipeTransform {

  transform(value: any, sign: string, order: number , ...args: unknown[]): string {
    if (value != null) {
      return value.split(sign)[order]; 
    }
    return value
  }

}
