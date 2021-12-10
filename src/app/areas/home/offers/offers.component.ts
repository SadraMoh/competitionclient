import { Component, OnInit } from '@angular/core';
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
    private configService: ConfigService
  ) { }

  offers?: Coinbox[]

  content: string = '';

  ngOnInit(): void {
    this.coinbox.get().subscribe(
      res => this.offers = res.value
    )

    this.configService.coinText()
      .subscribe(
        res => {
          this.content = res.value;
        }
      )

  }

}
