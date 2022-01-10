import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { ApiService } from './ApiService';
import { isResVaild, Res } from '../models/Res';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements ApiService  {

  readonly route = join(environment.api, 'config');
  
  constructor(private client: HttpClient) { }

  /** get coin contetn */
  coinText(): Observable<Res<string>> {
    const to = join(this.route, 'coinText');

    return from(new Promise<Res<string>>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }
  
  /** get coin contetn */
  aboutText(): Observable<Res<string>> {
    const to = join(this.route, 'aboutText');

    return from(new Promise<Res<string>>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }
  
  /** get guidetext */
  guide(): Observable<Res<string>> {
    const to = join(this.route, 'guide');

    return from(new Promise<Res<string>>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }
  
}
