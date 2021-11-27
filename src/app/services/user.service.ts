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

@Injectable({
  providedIn: 'root'
})
export class UserService implements ApiService {

  readonly route = join(environment.api, 'user');

  constructor(
    private client: HttpClient,
    private account: AccountService
  ) { }


  
}
