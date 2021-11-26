import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Signup } from 'src/app/models/account/Signup';
import User from 'src/app/models/user/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  attempt: User = {
    bio: '', fullName: '', id: 1, profileImageUrl: ''
  };

  @ViewChild('bio')
  bio!: NgModel;

  @ViewChild('fullName')
  fullName!: NgModel;

  get isValid(): boolean {
    return Boolean(this.fullName?.valid && this.bio?.valid);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
