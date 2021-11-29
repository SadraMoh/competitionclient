import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/models/account/Signup';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User = {
    bio: '', fullName: '', id: -1, profileImageUrl: ''
  };

  @ViewChild('bio')
  bio!: NgModel;

  @ViewChild('fullName')
  fullName!: NgModel;

  get isValid(): boolean {
    return Boolean(this.fullName?.valid && this.bio?.valid);
  }

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(us => {
      this.user = us;
    });
  }

  edit(): void {
    debugger

    const attempt: User = {
      bio: this.user.bio,
      fullName: this.user.fullName,
      id: this.user.id,
      profileImageUrl: ''
    }

    this.userService.update(attempt)
      .subscribe(
        (res) => { this.router.navigate(['user', 'profile']) }
      )
  }

}
