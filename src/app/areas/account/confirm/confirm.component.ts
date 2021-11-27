import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @ViewChild('code')
  code!: NgModel;

  attempt: any = { code: '' };

  serverError!: string;

  public get isValid(): Boolean {
    return Boolean(this.code?.valid);
  }

  constructor() { }

  ngOnInit(): void {
  }

  confirm() {

  }

}
