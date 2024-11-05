import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtags',
  standalone: true
})
export class SubtagsPipe implements PipeTransform {

  transform(value: String, ...args: number[]): string {
    let subtags = value.split(',');
    // get first n tages
    let n = args[0];
    let result = '';
    for (let i = 0; i < Math.min(n,subtags.length); i++) {
      result += subtags[i] + ' ';
    }
    return result;
  }


}
