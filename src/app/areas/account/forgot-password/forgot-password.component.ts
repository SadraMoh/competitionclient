import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { SendPassword } from 'src/app/models/account/SendPassword';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  attempt: SendPassword = { telNo: '' }

  @ViewChild('tel')
  tel!: NgModel;

  serverError?: string;
  serverSuccess?: string;

  isPasswordChangeSuccessful: boolean = false;

  public get isValid(): Boolean {
    return Boolean(this.tel?.valid);
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  sendPassword() {
    this.serverError = undefined;

    this.accountService.sendPassword(this.attempt)
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.serverSuccess = 'پیغام حاوی گذرواژه جدید شما به شما پیامک شد';
            this.isPasswordChangeSuccessful = true;
          }
          else
            this.serverError = 'خطایی پیش آمده، لطف بعدا امتحان کنید';
        },
        (rej) => {
          this.serverError = rej;
        }
      )
  }

}
