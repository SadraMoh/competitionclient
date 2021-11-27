import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  attempt: any = { telNo: '' }

  @ViewChild('tel')
  tel!: NgModel;

  serverError!: string;

  public get isValid(): Boolean {
    return Boolean(this.tel?.valid);
  }
  
  constructor() { }
  
  ngOnInit(): void {

  }

  confirm() {

  }

}
