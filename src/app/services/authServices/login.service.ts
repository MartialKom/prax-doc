import { Injectable } from '@angular/core';
import { MakeRequestService } from '../commons/make-request.service';
import { UserModel } from 'src/app/models/user.model';
import { BehaviorSubject, Observable} from 'rxjs';
import { LoginRequest } from 'src/app/models/login.model';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegisterRequest } from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUser:Observable<UserModel> | undefined;
  private currentUserSubject:BehaviorSubject<UserModel> | undefined;

  
  constructor(
    private requestService: MakeRequestService,
  ) { 
    //this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage?.getItem("currentUser")?? ''));
    //this.currentUser = this.currentUserSubject.asObservable();
  }

  login(request: LoginRequest){

    return this.requestService.request(
      "POST",
      `auth/login`,
      "http://localhost:8000/",
      request,
      'json',
      'response',
    ).pipe(
      map((response: any)=>{
        return response;
      })
    )
  }

  register(request: RegisterRequest){

    return this.requestService.request(
      "POST",
      `auth/register`,
      "http://localhost:8000/",
      request,
      'json',
      'response',
    ).pipe(
      map((response: any)=>{
        return response;
      })
    )
  }

  isAuth(){
    return this.requestService.request(
      "GET",
      `auth/isAuth`,
      "http://localhost:8000/",
      null,
      'json',
      'response'
    ).pipe(
      map((response:any)=>{
        return response;
      })
    )
  }
}
