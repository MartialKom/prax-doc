import { Injectable } from '@angular/core';
import { LocalStorageService } from '../commons/local-storage.service';
import { MakeRequestService } from '../commons/make-request.service';
import { map } from 'rxjs/operators';
import { client, ID, account } from 'src/lib/appwrite';
import { Databases, Query } from 'appwrite';
import { AppointmentRequest } from 'src/app/models/Appointment.model';
import { environment } from 'src/environments/environment';
import { DoctorRequest } from 'src/app/models/Doctors.model';
import { v4 as uuidv4 } from 'uuid';
import { HolidayRequest } from 'src/app/models/holidays.model';

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

  async getAllDoctors() {
    try {
      const databases = new Databases(client);

      const users = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdDoctors,
        [Query.orderAsc('name')]
      );

      return users.documents;
    } catch (error: any) {
      console.error('Failed to get doctors:', error.message);
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
          timeEnd: request.endTime,
          email: request.email ?? null,
          idDoctor: request.idDoctor,
        }
      );

      return appointment;
    } catch (error: any) {
      console.error('Failed to create appointment:', error.message);
      return error.message;
    }
  }

  async addDoctors(request: DoctorRequest) {
    const databases = new Databases(client);

    await account.deleteSession('current');
    account.createAnonymousSession();
    try {
      const doctorAccount = await account.create(
        ID.unique(),
        request.email ?? '',
        request.email ?? '',
        request.name ?? ''
      );

      const doctor = await databases.createDocument(
        environment.databaseId,
        environment.collectionIdDoctors,
        ID.unique(),
        {
          id: doctorAccount.$id,
          name: request.name,
          contact: request.contact,
          email: request.email,
          speciality: request.speciality,
        }
      );

      return doctor;
    } catch (error: any) {
      console.error('Failed to create doctor:', error.message);
      return error.message;
    }
  }

  async createAdminAppointment(date: any, time: any, timeEnd: any, title: any) {
    try {
      const userData = this.localstorageService.get('user');
      const userId = userData.$id;
      const name = title;
      const email = userData.email;

      const databases = new Databases(client);

      var idDoctor = null;
      if(userData.labels[0]==='doctor') idDoctor = userId;

      const appointment = await databases.createDocument(
        environment.databaseId,
        environment.collectionIdAppointment,
        ID.unique(),
        {
          idUser: userId,
          date: date,
          name: name,
          time: time ?? '',
          timeEnd: timeEnd,
          email: email,
          status: 'VALIDATED',
          idDoctor: idDoctor
        }
      );

      return appointment;
    } catch (error: any) {
      console.error('Failed to create appointment:', error.message);
      return error.message;
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

  async getAllAppointments() {
    const databases = new Databases(client);

    const userData = this.localstorageService.get('user');
    const userId = userData.$id;
    if (userData.labels[0] === 'doctor') {
      const appointments = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdAppointment,
        [Query.orderAsc('date'), Query.equal('idDoctor', userId)]
      );
      return appointments.documents;
    }
    const appointments = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdAppointment,
      [Query.orderAsc('date')]
    );

    return appointments.documents;
  }

  async getAllWaitingAppointments() {
    const databases = new Databases(client);

    const appointments = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdAppointment,
      [Query.equal('status', 'WAITING')]
    );

    return appointments.documents;
  }

  async updateEvent(id: string, event: any) {
    const databases = new Databases(client);

    const appointment = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdAppointment,
      id,
      {
        date: event.startStr.split('T')[0],
        time: event.startStr.split('T')[1],
        timeEnd: event.endStr.split('T')[1],
      }
    );

    return appointment;
  }

  async deleteAppointment(id: string) {
    const databases = new Databases(client);

    return await databases.deleteDocument(
      environment.databaseId,
      environment.collectionIdAppointment,
      id
    );
  }

  async deleteDoctors(id: string) {
    const databases = new Databases(client);
    return await databases.deleteDocument(
      environment.databaseId,
      environment.collectionIdDoctors,
      id
    );
  }

  async updateAppointment(id: string, date: any, timeStart: any, timeEnd: any) {
    const databases = new Databases(client);

    const appointment = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdAppointment,
      id,
      {
        date: date,
        time: timeStart,
        timeEnd: timeEnd,
      }
    );

    return appointment;
  }

  async validAppointment(id: string) {
    const databases = new Databases(client);

    const appointment = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdAppointment,
      id,
      {
        status: 'VALIDATED',
      }
    );

    return appointment;
  }

  async updateDoctor(doctor: any, id: any) {
    const databases = new Databases(client);

    const updatedDoctor = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdDoctors,
      id,
      doctor
    );

    return updatedDoctor;
  }

  async getAllHolidays() {
    const databases = new Databases(client);

    const userData = this.localstorageService.get('user');
    const userId = userData.$id;

    if (userData.labels[0] === 'doctor') {
      const holidays = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdHolidays,
        [Query.orderAsc('date'), Query.equal('idUser', userId)]
      );
      return holidays.documents;
    }
    const holidays = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdHolidays,
      [Query.orderAsc('date')]
    );
    return holidays.documents;
  }

  async addHolidays(request: HolidayRequest) {
    try {
      const databases = new Databases(client);

      const userData = this.localstorageService.get('user');
      const userId = userData.$id;

      const holiday = await databases.createDocument(
        environment.databaseId,
        environment.collectionIdHolidays,
        ID.unique(),
        {
          idUser: userId,
          date: request.date,
          name: userData.name,
          dateEnd: request.dateEnd,
          contact: request.contact ?? null,
          email: userData.email ?? null,
        }
      );

      return holiday;
    } catch (error: any) {
      console.error('Failed to create appointment:', error.message);
      return error.message;
    }
  }

  async updateholiday(id: string, event: any) {
    const databases = new Databases(client);

    const holiday = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdHolidays,
      id,
      {
        date: event.start,
        dateEnd: event.end
      }
    );

    return holiday;
  }

  async changeStatus(id:string , status: string){
    const databases = new Databases(client);

    const holiday = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdHolidays,
      id,
      {
        status: status
      }
    );

    return holiday;
  }

  async deleteHoliday(id: string) {
    const databases = new Databases(client);

    return await databases.deleteDocument(
      environment.databaseId,
      environment.collectionIdHolidays,
      id
    );
  }
}
