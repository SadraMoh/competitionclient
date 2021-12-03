import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { CoinboxService } from 'src/app/services/coinbox.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // apply sky background-image
    document.body.classList.add('sky');
  }

  ngOnDestroy(): void {
    // remove sky background-image
    document.body.classList.remove('sky');
  }

}
