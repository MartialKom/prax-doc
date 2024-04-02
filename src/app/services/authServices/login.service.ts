import { Injectable } from '@angular/core';
import { MakeRequestService } from '../commons/make-request.service';
import { UserModel } from 'src/app/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/login.model';
import { RegisterRequest } from 'src/app/models/register.model';
import { account, ID, client } from 'src/lib/appwrite';
import { Databases, Query } from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUser: Observable<UserModel> | undefined;
  private currentUserSubject: BehaviorSubject<UserModel> | undefined;

  constructor(private requestService: MakeRequestService) {
    //this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage?.getItem("currentUser")?? ''));
    //this.currentUser = this.currentUserSubject.asObservable();
  }

  async login(request: LoginRequest) {
    try {
      const databases = new Databases(client);
      
      await account
        .createEmailSession(request.username ?? '', request.password ?? '')
        .then((response) => {
          console.log('Response: ' + response);
        });

      var user = await account.get();

      const users = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdDoctors,
        [Query.equal('id', user.$id)]
      );

      if(users.documents.length>0){
        user.labels.push("doctor");
      }

      return user;
    } catch (error: any) {
      console.error('Failed to logIn:', error.message);
      return error.message;
    }
  }

  async register(request: RegisterRequest) {
    try {
      await account.create(
        ID.unique(),
        request.email ?? '',
        request.password ?? '',
        request.name ?? ''
      );
      const databases = new Databases(client);

      const newAccount = await this.login({
        username: request.email,
        password: request.password,
      });

      if (newAccount) {
        await databases.createDocument(
          environment.databaseId,
          environment.collectionIdUser,
          ID.unique(),
          {
            name: request.name,
            email: request.email,
            id: newAccount.$id,
          }
        );
      }

      return newAccount;
    } catch (error: any) {
      console.error('Failed to register:', error.message);
      return error.message;
    }
  }

  async logout() {
    await account.deleteSession('current');
  }
}
