import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  @ViewChild('oldPass')
  oldPass!: NgModel;
  
  @ViewChild('newPass')
  newPass!: NgModel;

  @ViewChild('repeatPass')
  repeatPass!: NgModel;

  get isValid(): boolean {
    return Boolean(this.oldPass?.valid && this.newPass?.valid && this?.repeatPass);
  }
  
  attempt: any = { };
  
  ngOnInit(): void {
  }

}
