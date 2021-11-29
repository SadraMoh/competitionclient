import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatePassword } from 'src/app/models/user/UpdatePassword';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('oldPass')
  oldPass!: NgModel;

  @ViewChild('newPass')
  newPass!: NgModel;

  @ViewChild('repeatPass')
  repeatPass!: NgModel;

  repeat!: string;

  get isValid(): boolean {
    return Boolean(this.oldPass?.valid && this.newPass?.valid && this.repeatPass.valid && (this.attempt.newPassword == this.repeat));
  }

  attempt: UpdatePassword = { newPassword: '', oldPassword: '' };

  serverError?: string;
  
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  changePassword(): void {
    this.serverError = undefined;
    this.userService.UpdatePassword(this.attempt)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['user', 'profile'])
        },
        (err) => {
          this.serverError = err;
        });
  }

}
