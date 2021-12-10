import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  _deadline?: string

  /**
   * @example "8.07:34:17.0794045"
   */
  @Input('deadline')
  public set deadline(v: string | undefined) {
    if (!v) return;

    this._deadline = v;

    let [daysAndHours, minutes, seconds]: any = this._deadline?.split(':');
    let [days, hours]: any = daysAndHours.split('.');

    this.days =    Number(days);
    this.hours =   Number(hours);
    this.minutes = Number(minutes);
    this.seconds = Number(seconds);

    this.countdownSub = this.countdown.subscribe(() => this.update());
  }

  public get deadline(): string | undefined {
    return this._deadline;
  }

  /** timer */
  countdown = interval(1000);
  countdownSub?: Subscription

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }

  /** update days, hours ,... */
  update() {

    this.seconds--;

    if (this.seconds < 0) {
      this.minutes--;
      this.seconds = 59;
    }

    if (this.minutes < 0) {
      this.hours--;
      this.minutes = 59
    }

    if (this.hours < 0) {
      this.days--;
      this.hours = 11
    }
  }

}
