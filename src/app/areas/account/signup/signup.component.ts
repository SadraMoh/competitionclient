import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/models/account/Signup';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  /** the object to send to the login method */
  readonly attempt: Signup = { fullName: '', telNo: '', password: '', };

  @ViewChild('fullName')
  fullName!: NgModel;

  @ViewChild('tel')
  tel!: NgModel;

  @ViewChild('password')
  password!: NgModel;

  get isValid(): boolean {
    return Boolean(this.tel?.valid && this.password?.valid);
  }

  /** @todo [REMOVE] */
  usr!: User

  serverError!: string;

  constructor(
    private account: AccountService,
    private router: Router    
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  signup(): void {
    this.serverError = '';

    this.account.signup(this.attempt)
      .subscribe(
        res => {
          this.router.navigate(['/', 'account', 'confirm', this.attempt.telNo])
        },
        (err: string) => {
          this.serverError = err;
        });

  }
}
