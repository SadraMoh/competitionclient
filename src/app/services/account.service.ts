import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, observable, Observable } from 'rxjs';
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
import { JwtHelperService } from '@auth0/angular-jwt';
import User from '../models/user/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements ApiService {

  readonly route = join(environment.api, 'account');

  /** Get token from localStorage */
  public get token(): string | undefined {
    return localStorage.getItem('tkn') as string | undefined;
  }

  /** Store token in localStorage */
  public set token(v: string | undefined) {
    localStorage.setItem('tkn', v as string);
  }

  private readonly jwtHelper: JwtHelperService = new JwtHelperService();

  public get isJWTValid(): boolean {

    if (!this.token) return false;

    if (this.jwtHelper.isTokenExpired(this.token)) return false;

    return true;

  }

  public get loggedIn(): boolean {
    return this.isJWTValid;
  }

  public get tokenData(): object | undefined {
    return this.jwtHelper.decodeToken(this.token);
  }

  private _user?: User;
  public get user(): Observable<User> {
    return from(new Promise<User>(
      (res) => {
        if (this._user)
          res(this._user)
        else {
          this.getUserData()
            .subscribe(
              (result) => {
                this._user = result.value;
                res(this._user);
              });
        }
      }
    ));
  }

  constructor(
    private client: HttpClient,
    private router: Router,
  ) { }

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
          // hydrate user data
          this.getUserData().subscribe(res => this._user = res.value);
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
      this.client.post<DbRes<Signup>>(to, input)
        .subscribe(
          result => {
            if (isDbResValid(result))
              res(result.result);
            else
              rej(result.result.message);
          },
          err => {
            // @todo FUCKN Handle your ERRORS
            rej(err.error.errors.Password || err.err.errors.TelNo);
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

  /** Get the logged in users data */
  getUserData(): Observable<Res<User>> {
    const to = join(environment.api, 'user', 'find');

    if (!this.token) throw 'User not logged in';

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.get<Res<User>>(to).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }

}
