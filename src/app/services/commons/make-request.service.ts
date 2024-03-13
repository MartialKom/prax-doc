import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MakeRequestService {

  private headers: HttpHeaders = new HttpHeaders();
  //private currentUser: UserModel;

  constructor(
    private makeRequest: HttpClient,
  ) {
    
  }

  request<T>(
    method: string,
    url: string,
    baseUrl?: string,
    body?: any,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    observe?: 'body' | 'events' | 'response',
    contentType?: string,
  ): Observable<T> {
    if (contentType) {
      this.headers.set('Content-Type', contentType);
    } else {
      this.headers.set('Content-Type', 'application/json');
    }

    const options = {
      body: body,
      headers: this.headers,
      responseType: responseType,
      observe: observe
    };

    // @ts-ignore
    return this.makeRequest.request<T>(method, baseUrl + url, options);
  }
  
}