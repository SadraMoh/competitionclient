import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds'
})
export class SecondsPipe implements PipeTransform {

  transform(miliseconds: number, decimalCount:number = 1): string {
    const seconds = miliseconds / 100;
    return seconds.toFixed(decimalCount);
  }

}
