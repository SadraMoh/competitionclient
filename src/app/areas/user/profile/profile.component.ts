import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import User from 'src/app/models/user/User';
import { History } from 'src/app/models/user/History';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private userService: UserService
  ) { }

  user?: User

  history: History[] = [];

  ngOnInit(): void {
    this.accountService.user.subscribe(us => this.user = us);

    this.userService.history()
      .subscribe(
        res => {
          this.history = res.value;
        }
      )
  }

  signout() {
    this.accountService.signout();
  }

}
