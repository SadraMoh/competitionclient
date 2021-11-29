import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {

  readonly dictionary = [
    'ساده',
    'متوسط',
    'دشوار',
  ]

  transform(difficulty: number): string {
      return this.dictionary[difficulty] ?? '???';
  }

}
