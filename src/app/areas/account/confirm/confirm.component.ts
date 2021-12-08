import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Confirm } from 'src/app/models/account/Confirm';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @ViewChild('code')
  code!: NgModel;

  attempt: Confirm = { auth: '', telNo: '' };

  serverError!: string;

  public get isValid(): Boolean {
    return Boolean(this.code?.valid);
  }

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.attempt.telNo = this.route.snapshot.params['telNo'];
  }

  confirm() {
    this.accountService.confirm(this.attempt)
      .subscribe(
        (res) => {
          this.router.navigate(['/','account','login'])
        },
        (rej) => {
          this.serverError = rej.message;
        }
      )
  }

}
