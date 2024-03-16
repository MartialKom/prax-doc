import { Injectable } from '@angular/core';
import { LocalStorageService } from '../commons/local-storage.service';
import { MakeRequestService } from '../commons/make-request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadMediaService {
  constructor(
    private makeRequest: MakeRequestService,
    private localstorageService: LocalStorageService
  ) {}

  uploadFFile(file: File | undefined) {
    const userData = this.localstorageService.get('user');
    const userId = userData.id;

    const contentType = 'multipart/form-data';
    const formData: FormData = new FormData();

    formData.append('document', file ?? '');

    return this.makeRequest
      .request(
        'POST',
        `upload/${userId}`,
        'http://207.180.206.20:6000/',
        formData,
        'json',
        'response',
        contentType
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  importFile(){
    const userData = this.localstorageService.get('user');
    const userId = userData.id;

    return this.makeRequest.request(
      "GET",
      `import/${userId}`,
      'http://207.180.206.20:6000/',
      null,
      'json',
      'response'
    ).pipe(
      map((response:any)=> {
        return response;
      })
    )
  }

  importPdf(){
    const userData = this.localstorageService.get('user');
    const userId = userData.id;

    return this.makeRequest.request(
      "GET",
      `import/pdf/${userId}`,
      'http://207.180.206.20:6000/',
      null,
      'json',
      'response'
    ).pipe(
      map((response:any)=> {
        return response;
      })
    )
  }

  deleteDocument(path:string){

    const userData = this.localstorageService.get('user');
    const userId = userData.id;

    return this.makeRequest.request(
      "POST",
      `media/delete/${userId}`,
      'http://207.180.206.20:6000/',
      {
        "path": path
      },
      'json',
      'response'
    ).pipe(
      map((response:any)=>{
        return response;
      })
    )

  }
}
