import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Signin } from '../models/account/Signin';
import { Confirm } from '../models/account/Confirm';
import { environment } from 'src/environments/environment';
import { isResVaild, Res } from '../models/Res';
import { join } from '@fireflysemantics/join';
import { Signup } from '../models/account/Signup';
import { DbRes, isDbResValid } from '../models/DbRes';
import { ApiService } from './ApiService';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService implements ApiService {

  readonly route = join(environment.api, 'account');

  /** Get token from localStorage */
  public get token(): string | null {
    return localStorage.getItem('tkn');
  }

  /** Store token in localStorage */
  public set token(v: string | null) {
    localStorage.setItem('tkn', v as string);
  }

  constructor(private client: HttpClient,private router: Router) { }

  /**
   * Login method
   * @param input Username, Password
   * @returns Username, JWT
   */
  login(input: Signin): Observable<Res<Signin>> {
    const to = join(this.route, 'Signin');

    return from(new Promise<Res<Signin>>((res, rej) => {
      this.client.post<Res<Signin>>(to, input).subscribe(result => {
        if (isResVaild(result)) {
          this.token = result.value.token as string;
          res(result);
        }
        else
          rej(result.message);
      });
    }))
  }

  /**
   * Signup a new user
   * @param input Username, TelNo, Password
   * @returns all info about the user
   */
  signup(input: Signup): Observable<Res<Signup>> {
    const to = join(this.route, 'Signup');

    return from(new Promise<Res<Signup>>((res, rej) => {
      this.client.post<DbRes<Signup>>(to, input).subscribe(result => {
        if (isDbResValid(result))
          res(result.result);
        else
          rej(result.exception);

      });
    }));
  }

  /**
   * Confirm telephone number via auth
   * @param input telNo, auth
   * @returns telNo, auth
   */
  confirm(input: Confirm) {
    const to = join(this.route, 'Confirm');

    return from(new Promise<Res<Confirm>>((res, rej) => {
      this.client.post<DbRes<Confirm>>(to, input).subscribe(result => {
        if (isDbResValid(result))
          res(result.result);
        else
          rej(result.exception);
      });
    }))
  }

  /**
   * Signout the user and clear their token, redirect to login page
   */
  signout() {
    this.token = "";
    this.router.navigateByUrl('/account/login');
  }

}
