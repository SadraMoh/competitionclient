import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remaining'
})
export class RemainingPipe implements PipeTransform {

  transform(then: any, ...args: unknown[]): string {
    let ans = ''
    let now = Date.now();

    /** in miliseconds */
    let span = now - new Date(then).getTime();

    let spanInSeconds = span / 1000;
    let spanInMinutes = spanInSeconds / 60;
    let spanInHours = spanInMinutes / 60;
    let spanInDays = spanInHours / 24;
    let spanInWeeks = spanInDays / 7;

    // floor
    spanInSeconds = Math.floor(spanInSeconds);
    spanInMinutes = Math.floor(spanInMinutes);
    spanInHours = Math.floor(spanInHours);
    spanInDays = Math.floor(spanInDays);
    spanInWeeks = Math.floor(spanInWeeks);
    
    if (spanInWeeks > 0)
      return `${spanInWeeks} هقته`;
    else if (spanInDays > 0)
      return `${spanInDays} روز`;
    else if (spanInHours > 0)
      return `${spanInHours} ساعت`;
    else if (spanInMinutes > 0)
      return `${spanInMinutes} دقیقه`;
    else if (spanInSeconds > 0)
      return `${spanInSeconds} ثانیه`;

    return ans;
  }

}
