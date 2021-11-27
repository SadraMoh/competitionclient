import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Signin } from 'src/app/models/account/Signin';
import { NgModel } from '@angular/forms';
import User from 'src/app/models/user/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Res } from 'src/app/models/Res';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  /** the object to send to the login method */
  readonly attempt: Signin = { telNo: '', password: '' };

  @ViewChild('tel')
  tel!: NgModel;

  @ViewChild('password')
  password!: NgModel;

  get isValid(): boolean {
    return Boolean(this.tel?.valid && this.password?.valid);
  }

  /** @todo [REMOVE] */
  usr!: User

  /** is working in the background... */
  working: boolean = false;

  serverError!: string;

  constructor(
    private account: AccountService,
    private user: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  login(): void {

    // clear error
    this.serverError = '';

    this.account.login(this.attempt)
      .subscribe(
        res => {
          this.router.navigateByUrl('/');
        },
        (err: string) => {
          this.serverError = err;
        });
  }

}
