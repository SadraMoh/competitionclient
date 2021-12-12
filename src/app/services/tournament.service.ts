import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { isResVaild, Res } from '../models/Res';
import { AnswerQuestion } from '../models/tournament/AnswerQuestion';
import { enumDictionary, HelperEnum } from '../models/helper/HelperEnum';
import { Tournament } from '../models/tournament/Tournament';
import { TournamentInfo } from '../models/tournament/TournamentInfo';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class TournamentService implements ApiService {

  readonly route = join(environment.api, 'tournament');

  constructor(private client: HttpClient) { }

  /**
   * get all tournaments
   * @returns all the available tournaments to join (without rounds)
   */
  get(): Observable<Res<Tournament[]>> {
    const to = join(this.route, 'get');

    return from(new Promise<Res<Tournament[]>>((res, rej) => {
      this.client.get<Res<Tournament[]>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }

  /**
   * get tournament by its Id
   * @param id tournament Id
   * @returns a tournament with the full list of its rounds
   */
  find(id: number): Observable<Res<Tournament>> {
    const to = join(this.route, 'find');

    return from(new Promise<Res<Tournament>>((res, rej) => {
      this.client.post<Res<Tournament>>(to, id).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }

  /**
   * check if an answer is correct or not
   */
  AnswerQuestion(answer: AnswerQuestion): Observable<Res<AnswerQuestion>> {
    const to = join(this.route, 'answerQuestion');

    return from(new Promise<Res<AnswerQuestion>>((res, rej) => {
      this.client.post<Res<AnswerQuestion>>(to, answer).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }

  /**
   * method for hydrating tournamentInfo component
   * @param id tournament id
   * @returns tournament info and leaderboards
   */
  findInfo(id: number): Observable<Res<TournamentInfo>> {
    const to = join(this.route, 'findInfo');

    return from(new Promise<Res<TournamentInfo>>((res, rej) => {
      this.client.post<Res<TournamentInfo>>(to, id).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }

  /**
   * purchase tournament and repeat it
   * @returns tournament info and leaderboards
   */
   repeat(tournamentId: number): Observable<Res<TournamentInfo>> {
    const to = join(this.route, 'repeat');

    return from(new Promise<Res<TournamentInfo>>((res, rej) => {
      this.client.post<Res<TournamentInfo>>(to, tournamentId).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }



}
