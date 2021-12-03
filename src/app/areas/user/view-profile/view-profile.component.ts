import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/user/User';
import { History } from 'src/app/models/user/History';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  user: User = {} as User;

  history: History[] = [];

  ngOnInit(): void {

    this.user.id = Number(this.route.snapshot.params['id']);
    this.userService.findById(this.user.id)
      .subscribe(
        (res) => {
          this.user = res.value;
        },
        (err) => {

        }
      )

    // this.userService.history(this.user.id)
    //   .subscribe(
    //     (res) => {
    //       this.history = res.value;
    //     },
    //     (err) => {

    //     }
    //   )

  }

}
