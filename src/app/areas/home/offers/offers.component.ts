import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coinbox } from 'src/app/models/coinbox/Coinbox';
import { CoinboxService } from 'src/app/services/coinbox.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(
    private coinbox: CoinboxService,
    private route: ActivatedRoute
  ) { }

  offers?: Coinbox[]

  nofunds: boolean = false;

  ngOnInit(): void {

    this.nofunds = (Boolean(this.route.snapshot.params["nofunds"]));

    this.coinbox.get().subscribe(
      res => this.offers = res.value
    )
  }

  buy(offerId: number) {

    this.coinbox.buy(offerId)
      .subscribe(
        (res) => {
          window.location.href = res;
        }
      )

  }

}
