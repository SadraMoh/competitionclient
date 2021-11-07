import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { Signin } from '../models/account/Signin';
import { Res } from '../models/Res';
import { HttpClient } from '@angular/common/http';
import User from 'src/app/models/user/User';
import { DbRes } from '../models/DbRes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly route = join(environment.api, 'user');

  constructor(
    private client: HttpClient,
    private account: AccountService
  ) { }


  getUserData(): Observable<Res<User>> {
    const to = join(this.route, 'find');

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.get<DbRes<User>>(to).subscribe(dbres => {
        if (dbres.isFaulted || dbres.isCanceled)
          rej(dbres.exception);
        else
          res(dbres.result);
      });
    }))
  }

}
