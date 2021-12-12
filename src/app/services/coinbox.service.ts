import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { ApiService } from './ApiService';
import { isResVaild, Res } from '../models/Res';
import { Coinbox } from '../models/coinbox/Coinbox';
import { CoinConfirm } from '../models/coinbox/CoinConfirm';

@Injectable({
  providedIn: 'root'
})
export class CoinboxService implements ApiService {

  readonly route = join(environment.api, 'coinbox');

  constructor(private client: HttpClient) { }

  get(): Observable<Res<Coinbox[]>> {
    const to = join(this.route, 'get');

    return from(new Promise<Res<Coinbox[]>>((res, rej) => {
      this.client.get<Res<Coinbox[]>>(to).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }

  find(id: number): Observable<Res<Coinbox>> {
    const to = join(this.route, 'find');

    return from(new Promise<Res<Coinbox>>((res, rej) => {
      this.client.post<Res<Coinbox>>(to, id).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }

  buy(offerId: number): Observable<string> {
    const to = join(this.route, 'buy');

    return from(new Promise<string>((res, rej) => {
      this.client.post<string>(to, offerId, { responseType: 'text' as any }).subscribe((result) => {
        res(result);
      })
    }))
  }

  confirm(id: CoinConfirm): Observable<Res<Coinbox>> {
    const to = join(this.route, 'confirm');

    return from(new Promise<Res<Coinbox>>((res, rej) => {
      this.client.post<Res<Coinbox>>(to, id).subscribe((result) => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      })
    }))
  }



}
