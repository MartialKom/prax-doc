import { Injectable } from '@angular/core';
import { LocalStorageService } from '../commons/local-storage.service';
import { MakeRequestService } from '../commons/make-request.service';
import { map } from 'rxjs/operators';
import { client, ID } from 'src/lib/appwrite';
import { Databases, Query } from 'appwrite';
import { environment } from 'src/environments/environment';
import { AppointmentRequest } from 'src/app/models/Appointment.model';

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
        environment.databaseId,
        environment.collectionIdUser,
        [Query.orderAsc('name')]
      );

      return users.documents;
    } catch (error: any) {
      console.error('Failed to get users:', error.message);
      return null;
    }
  }

  async getAllDoc() {
    try {
      const databases = new Databases(client);

      const docs = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdDocument,
        [Query.orderAsc('type')]
      );

      return docs.documents;
    } catch (error: any) {
      console.error('Failed to get documens:', error.message);
      return null;
    }
  }

  async createAppointment(request: AppointmentRequest) {
    try {
      const userData = this.localstorageService.get('user');
      const userId = userData.$id;

      const databases = new Databases(client);

      const appointment = await databases.createDocument(
        environment.databaseId,
        environment.collectionIdAppointment,
        ID.unique(),
        {
          idUser: userId,
          date: request.date,
          name: request.name,
          contact: request.contact,
          age: request.age,
          time: request.time ?? '',
        }
      );

      return appointment;
    } catch (error: any) {
      console.error('Failed to create appointment:', error.message);
      return null;
    }
  }

  async getAppointments() {
    const userData = this.localstorageService.get('user');
    const userId = userData.$id;

    const databases = new Databases(client);

    try {
      const appointments = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdAppointment,
        [Query.equal('idUser', userId)]
      );

      return appointments.documents;
    } catch (error: any) {
      console.error('Failed to get appointments:', error.message);
      return null;
    }
  }
}
