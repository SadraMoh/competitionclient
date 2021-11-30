import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
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

  @ViewChild('avatarPicker')
  avatarPicker!: ElementRef<HTMLInputElement>;

  /** either the url of the pre uploaded image, or the base64 of the new chosen avatar */
  avatar?: any;

  /** the image the user has chosen */
  chosenFile?: File;

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
      this.avatar = us.profileImageUrl;
      this.user = us;
    });
  }

  avatarPicked() {

    const input = this.avatarPicker.nativeElement;

    this.chosenFile = input.files?.[0];
    
    // preview image
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.avatar = e?.target?.result;
      }

      reader.readAsDataURL(input.files[0]);
    }

  }

  edit(): void {

    const tasks$: Observable<any>[] = [];

    const attempt: User = {
      bio: this.user.bio,
      fullName: this.user.fullName,
      id: this.user.id,
      profileImageUrl: '',
    }

    tasks$.push(this.userService.update(attempt))
    
     if (this.chosenFile)
      tasks$.push(this.userService.uploadProfileImage(this.chosenFile));

    zip(...tasks$).subscribe(
      (res) => this.router.navigate(['user', 'profile']),
      (err) => console.error(err)
    );
    
  }

}
