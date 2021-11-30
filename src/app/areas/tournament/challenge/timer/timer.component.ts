import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  /** 0 - 100 */
  get percentage(): number {
    return this.milis / this.max * 100;
  }



  /** max number of miliseconds */
  @Input("max")
  max: number = 1000;

  // #region remainingMilis
  _milis: number = 1000;

  public get milis(): number {
    return this._milis;
  }

  @Input('remaining')
  public set milis(v: number) {
    this._milis = v;
    this.milisChange.emit(v);
  }

  @Output("remainingChange")
  public milisChange: EventEmitter<number> = new EventEmitter<number>();
  // #endregion remainingMilis


  @Output("expired")
  expired: EventEmitter<void> = new EventEmitter<void>();

  @Output("started")
  started: EventEmitter<void> = new EventEmitter<void>();

  countdown = interval(100);
  countdownSub?: Subscription;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }

  public start() {
    this.countdownSub?.unsubscribe();
    this.countdownSub = this.countdown.subscribe(() => {
      this.milis -= 10;
      if (this.milis == 0) {
        this.expired.emit()
        this.freeze();
      }
    })
  }

  public freeze() {
    this.countdownSub?.unsubscribe()
  }

  /** set timer value to max */
  public reset() {
    this.milis = this.max;
  }

}


