import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isResVaild, Res } from '../models/Res';
import { HelperEnum } from '../models/tournament/HelperEnum';
import { Tournament } from '../models/tournament/Tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

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
   * get all helperEnums
   * @returns all possible gadgets 
   */
  helperEnums(): Observable<Res<HelperEnum[]>> {
    const to = join(this.route, 'helperEnums');

    return from(new Promise<Res<HelperEnum[]>>((res, rej) => {
      this.client.get<Res<HelperEnum[]>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))

  }

  
  
}
