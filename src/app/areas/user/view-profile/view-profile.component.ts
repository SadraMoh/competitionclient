import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/user/User';
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

  ngOnInit(): void {

    this.user.id = Number(this.route.snapshot.params['id']);
    this.userService.find(this.user.id)
      .subscribe(
        (res) => {

        },
        (err) => {

        }
      )

  }

}
