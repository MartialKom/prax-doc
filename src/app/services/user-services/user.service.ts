import { Injectable } from '@angular/core';
import { LocalStorageService } from '../commons/local-storage.service';
import { MakeRequestService } from '../commons/make-request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private makeRequest: MakeRequestService,
    private localstorageService: LocalStorageService) { }

    updateAccount(body: any){

      const userData = this.localstorageService.get('user');
      const userId = userData.id;

      return this.makeRequest.request(
        "POST",
        `auth/update/${userId}`,
        'http://207.180.206.20:6000/',
        body,
        'json',
        'response'
      ).pipe(
        map((response:any)=>{
          return response;
        })
      )
    }
}
