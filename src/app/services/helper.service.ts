import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { join } from '@fireflysemantics/join';
import { from, Observable } from 'rxjs';
import { isResVaild, Res } from '../models/Res';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { ApiService } from './ApiService';
import { enumDictionary, HelperEnum } from '../models/helper/HelperEnum';

@Injectable({
  providedIn: 'root'
})
export class HelperService implements ApiService {

  readonly route = join(environment.api, 'helperEnums');

  constructor(private client: HttpClient) { }

   /**
   * get all helperEnums
   * @returns all possible gadgets 
   */
    helperEnums(): Observable<Res<HelperEnum[]>> {
      const to = join(this.route, 'get');
  
      return from(new Promise<Res<HelperEnum[]>>((res, rej) => {
        this.client.get<Res<HelperEnum[]>>(to).subscribe((result) => {
          if (isResVaild(result)) {
  
            result.value = result.value.map(i => {
  
              i.title = enumDictionary[i.title];
              return i;
            })
  
            res(result);
          }
          else
            rej(result.message);
        })
      }))
  
    }
  
}
