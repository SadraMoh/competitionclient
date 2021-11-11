import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { Signin } from '../models/account/Signin';
import { Res } from '../models/Res';
import { HttpClient } from '@angular/common/http';
import User from 'src/app/models/user/User';
import { DbRes, isDbResValid } from '../models/DbRes';
import { ApiService } from './apiservice';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ApiService {

  readonly route = join(environment.api, 'user');

  constructor(
    private client: HttpClient,
    private account: AccountService
  ) { }


  /** Get the logged in users data */
  getUserData(): Observable<Res<User>> {
    const to = join(this.route, 'find');

    if(!this.account.token) throw 'User not logged in';

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.get<DbRes<User>>(to).subscribe(dbres => {
        if (isDbResValid(dbres))
          rej(dbres.exception);
        else
          res(dbres.result);
      });
    }))
  }

}
