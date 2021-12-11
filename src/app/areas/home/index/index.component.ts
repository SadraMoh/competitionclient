import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { CoinboxService } from 'src/app/services/coinbox.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  cointent: string = '';
  
  constructor(
    public accountService: AccountService,
    private configService: ConfigService
    ) { }

  ngOnInit(): void {
    // apply sky background-image
    document.body.classList.add('sky');


    // 
    this.configService.coinText()
      .subscribe(
        res => {
          this.cointent = res.value;
        }
      )
  }

  ngOnDestroy(): void {
    // remove sky background-image
    document.body.classList.remove('sky');
  }

}
