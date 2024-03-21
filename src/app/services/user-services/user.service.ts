import { Injectable } from '@angular/core';
import { LocalStorageService } from '../commons/local-storage.service';
import { MakeRequestService } from '../commons/make-request.service';
import { map } from 'rxjs/operators';
import { client } from 'src/lib/appwrite';
import { Databases, Query } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private makeRequest: MakeRequestService,
    private localstorageService: LocalStorageService
  ) {}

  updateAccount(body: any) {
    const userData = this.localstorageService.get('user');
    const userId = userData.id;

    return this.makeRequest
      .request(
        'POST',
        `auth/update/${userId}`,
        'http://localhost:8000/',
        body,
        'json',
        'response'
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  async getAllUser() {
    try {
      const databases = new Databases(client);

      const users = await databases.listDocuments(
        '65fc13f84f65d95af5fa',
        'users',
        [Query.orderAsc('name')]
      );

      return users.documents;
    } catch (error: any) {
      console.error('Failed to get images:', error.message);
      return null;
    }
  }
}
