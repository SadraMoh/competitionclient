import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input("nav")
  nav: boolean = true;

  constructor(public account: AccountService) { }

  user?: User

  ngOnInit(): void {
    this.account.user.subscribe(i => this.user = i);
  }

}
