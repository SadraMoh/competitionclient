import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UpdatePassword } from 'src/app/models/user/UpdatePassword';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';

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
    return Boolean(this.oldPass?.valid && this.newPass?.valid && this?.repeatPass);
  }
  
  attempt: UpdatePassword = { newPassword: '', oldPassword: '' };
  
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    
  }

}
