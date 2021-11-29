import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private account: AccountService) { }

  user?: User

  ngOnInit(): void {
    this.account.user.subscribe(us => this.user = us);
  }

  signout() {
    this.account.signout();
  }

}
