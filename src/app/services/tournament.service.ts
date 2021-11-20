import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isResVaild, Res } from '../models/Res';
import { Tournament } from '../models/tournament/Tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  readonly route = join(environment.api, 'tournament');

  constructor(private client: HttpClient) { }

  /**
   * get all tournaments
   * @returns all the available tournaments to join
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

}
