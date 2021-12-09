import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline'
})
export class DeadlinePipe implements PipeTransform {

  transform(deadline: string, ...args: unknown[]): string {

    // "8.07:34:17.0794045".split(':')

    let [daysAndHours, minutes, seconds]: any = deadline.split(':');
    let [days, hours]: any = daysAndHours.split('.');

    days = Math.floor(Number(days));
    hours = Math.floor(Number(hours));
    minutes = Math.floor(Number(minutes));
    seconds = Math.floor(Number(seconds));

    if (days > 0)
      return `${days} روز`;
    else if (hours > 0)
      return `${hours} ساعت`;
    else if (minutes > 0)
      return `${minutes} دقیقه`;
    else if (seconds > 0)
      return `${seconds} ثانیه`;

    return '0';
  }

}
