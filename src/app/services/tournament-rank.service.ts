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
import { TournamentRank } from '../models/tournamentRank/tournamentRank';

@Injectable({
  providedIn: 'root'
})
export class TournamentRankService implements ApiService {

  readonly route = join(environment.api, 'tournamentRank');

  constructor(
    private client: HttpClient,
  ) { }

  /**
   * get main leaderboard
   * @returns 
   */
   get(): Observable<Res<TournamentRank[]>> {
    const to = join(this.route, 'get');

    return from(new Promise<Res<TournamentRank[]>>((res, rej) => {
      this.client.get<Res<TournamentRank[]>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }
  
}
