import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { Signin } from '../models/account/Signin';
import { isResVaild, Res } from '../models/Res';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import User from 'src/app/models/user/User';
import { DbRes, isDbResValid } from '../models/DbRes';
import { ApiService } from './ApiService';
import { UpdatePassword } from '../models/user/UpdatePassword';
import { History } from '../models/user/History';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ApiService {

  readonly route = join(environment.api, 'user');

  constructor(
    private client: HttpClient,
    private account: AccountService
  ) { }

  public get user(): Observable<User> {
    return this.account.user;
  }

  /**
   * get current user
   */
  find(): Observable<Res<User>> {
    const to = join(this.route, 'Find');

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
  findById(id: number): Observable<Res<User>> {
    const to = join(this.route, 'findById');

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.post<Res<User>>(to, id).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }

  // /**
  // * get user history
  // * @param userId user id
  // * @returns history array
  // */
  // history(userId: number): Observable<Res<History[]>> {
  //   const to = join(this.route, 'history');

  //   return from(new Promise<Res<History[]>>((res, rej) => {
  //     this.client.post<Res<History[]>>(to, userId).subscribe((result) => {
  //       if (isResVaild(result))
  //         res(result);
  //       else
  //         rej(result.message);
  //     })
  //   }))
  // }


  /**
  * get logged in user history
  * @returns user history array
  */
  history(): Observable<Res<History[]>> {
    const to = join(this.route, 'history');

    return from(new Promise<Res<History[]>>((res, rej) => {
      this.client.get<Res<History[]>>(to).subscribe((result) => {
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

  updatePassword(pass: UpdatePassword): Observable<Res<UpdatePassword>> {
    const to = join(this.route, 'updatePassword');

    return from(new Promise<Res<UpdatePassword>>((res, rej) => {
      this.client.post<Res<UpdatePassword>>(to, pass).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }

  /**
   * upload an image to the server and set it to the users avatar
   * @param file avatar file to upload
   * @returns uploaded avatar url
   */
  uploadProfileImage(file: File): Observable<HttpEvent<string>> {
    const to = join(this.route, 'uploadProfileImage');

    let formData = new FormData();
    formData.append('image', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', to, formData, options);
    return this.client.request<string>(req);
  }


}
