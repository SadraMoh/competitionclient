import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/user/History';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  history: History[] = [];

  ngOnInit(): void {

    this.userService.currentHistory()
      .subscribe(
        (res) => {
          this.history = res.value;
        }
      )


  }

}
