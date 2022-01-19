import { AfterViewInit, Component, EventEmitter, KeyValueDiffers, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { CoinboxService } from 'src/app/services/coinbox.service';
import { ConfigService } from 'src/app/services/config.service';
import { ModalComponent } from 'src/app/utility/atomic/modal/modal.component';
import { TournamentsComponent } from './tournaments/tournaments.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

  cointent: string = '';

  constructor(
    public accountService: AccountService,
    private configService: ConfigService
  ) { }

  @Output('hydrate') hydrate: EventEmitter<void> = new EventEmitter();

  @ViewChild('loading')
  loading!: ModalComponent

  @ViewChild('tournaments')
  tournamentsComponent!: TournamentsComponent

  ngOnInit(): void {
    // apply sky background-image
    document.body.classList.add('sky');

    // 
    this.configService.coinText()
      .subscribe(
        res => {
          this.cointent = res.value;
          this.hydrate.emit();
        }
      )

  }

  ngAfterViewInit(): void {

    Promise.resolve().then(_ => this.loading.show())

    const hydrate = [
      this.tournamentsComponent.hydrate,
      this.hydrate
    ]

    let eventsCount = hydrate.length;

    hydrate.forEach(i => i.subscribe(_ => {
      eventsCount--;
      if (eventsCount == 0) {
        console.log('all');
        this.loading.hide()
      }
    }))

    // hydrate[0].subscribe(_ => console.log('tournaments component'))
    // hydrate[1].subscribe(_ => console.log('index component'))

  }

  ngOnDestroy(): void {
    // remove sky background-image
    document.body.classList.remove('sky');
    this.loading.hide();

  }

}
