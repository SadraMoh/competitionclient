import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinConfirm } from 'src/app/models/coinbox/CoinConfirm';
import { AccountService } from 'src/app/services/account.service';
import { CoinboxService } from 'src/app/services/coinbox.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  attempt?: CoinConfirm;

  serverError?: string;
  serverSuccess?: string;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private coinbox: CoinboxService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.attempt = {
        trans_id: params['trans_id'],
        order_id: params['order_id'],
        amount: Number(params['amount']),
      }

      this.coinbox.confirm(this.attempt)
        .subscribe(
          (res) => {
            this.serverSuccess = res.message;
            this.accountService.user.subscribe();
          },
          (rej) => {
            this.serverError = rej;
          }
        )

    });

  }

}
