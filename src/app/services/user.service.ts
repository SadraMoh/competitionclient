import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { Signin } from '../models/account/Signin';
import { isResVaild, Res } from '../models/Res';
import { HttpClient } from '@angular/common/http';
import User from 'src/app/models/user/User';
import { DbRes, isDbResValid } from '../models/DbRes';
import { ApiService } from './ApiService';
import { UpdatePassword } from '../models/user/UpdatePassword';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ApiService {

  readonly route = join(environment.api, 'user');

  constructor(
    private client: HttpClient,
    private account: AccountService
  ) { }

  public get user(): Observable<User>  {
    return this.account.user;
  }
  
  /**
   * get current user
   */
  get(): Observable<Res<User>> {
    const to = join(this.route, 'get');

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.get<Res<User>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }
  
  /**
   * find user by id
   * @param id user id
   * @returns user data
   */
  find(id: number): Observable<Res<User>> {
    const to = join(this.route, 'find');

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.post<Res<User>>(to, id).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }

  update(user: User): Observable<Res<User>> {
    const to = join(this.route, 'update');

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.post<Res<User>>(to, user).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }

  UpdatePassword(pass: UpdatePassword): Observable<Res<UpdatePassword>> {
    const to = join(this.route, 'UpdatePassword');

    return from(new Promise<Res<UpdatePassword>>((res, rej) => {
      this.client.post<Res<UpdatePassword>>(to, pass).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))


  }

}
