import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Signin } from '../models/account/Signin';
import { environment } from 'src/environments/environment';
import { Res } from '../models/Res';
import { join } from '@fireflysemantics/join';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly route = join(environment.api, 'account');

  /** The jwt token */
  _token?: string;

  public get token(): string {
    if (!this.token) throw "user not logged in";
    return this._token as string;
  }

  public set token(v: string) {
    this._token = v;
  }

  constructor(public client: HttpClient) { }

  /**
   * login method
   * @param input Username and Password
   * @returns Username and JWT
   */
  login(input: Signin): Observable<Res<Signin>> {
    const to = join(this.route, 'Signin');

    return from(new Promise<Res<Signin>>((res, rej) => {
      this.client.post<Res<Signin>>(to, input).subscribe(result => {
        if (!result.isSuccess) {
          rej(result.message);
        } else {
          this.token = result.value.token as string;
          res(result);
        }

      });
    }))
  }

}
