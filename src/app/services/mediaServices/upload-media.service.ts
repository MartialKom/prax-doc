import { Injectable } from '@angular/core';
import { LocalStorageService } from '../commons/local-storage.service';
import { MakeRequestService } from '../commons/make-request.service';
import { map } from 'rxjs/operators';
import { client, ID } from 'src/lib/appwrite';
import { Databases, Query, Storage } from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadMediaService {
  constructor(
    private makeRequest: MakeRequestService,
    private localstorageService: LocalStorageService
  ) {}

  async uploadFFile(file: File) {
    const userData = this.localstorageService.get('user');
    const userId = userData.$id;

    const databases = new Databases(client);
    const storage = new Storage(client);

    const fileUploaded = await storage.createFile(
      environment.bucketId,
      ID.unique(),
      file
    );

    var url: URL;

    if (file?.type.split('/')[1] != 'pdf')
      url = storage.getFilePreview('praxStorage', fileUploaded.$id);
    else url = storage.getFileView('praxStorage', fileUploaded.$id);

    try {
      const document = await databases.createDocument(
        environment.databaseId,
        environment.collectionIdDocument,
        ID.unique(),
        {
          url: url.toString(),
          idUtilisateur: userId,
          type: file?.type.split('/')[1],
        }
      );

      return document;
    } catch (error: any) {
      console.error('Failed to get images:', error.message);
      return null;
    }
  }

  async importFile() {
    const userData = this.localstorageService.get('user');
    const userId = userData.$id;
    const databases = new Databases(client);

    try {
      const images = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdDocument,
        [Query.notEqual('type', 'pdf'), Query.equal('idUtilisateur', userId)]
      );

      return images.documents;
    } catch (error: any) {
      console.error('Failed to get images:', error.message);
      return null;
    }
  }

  async importPdf() {
    const userData = this.localstorageService.get('user');
    const userId = userData.$id;
    const databases = new Databases(client);

    try{
      const pdf = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdDocument,
        [Query.equal('type', 'pdf'), Query.equal('idUtilisateur', userId)]
      );

      return pdf.documents;
    }catch (error: any) {
      console.error('Failed to get images:', error.message);
      return null;
    }
  }

  async deleteDocument(id: string) {
    const databases = new Databases(client);

    await databases.deleteDocument(environment.databaseId, environment.collectionIdDocument,id);

    return true;
  }
}
