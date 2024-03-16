import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { UploadMediaService } from 'src/app/services/mediaServices/upload-media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  loadingOp = false;
  myloading = false;
  documents: string[] = [];
  pdfs: any = [];
  loadingFile: boolean = false;
  isImage: any = true;
  isPdf: any = false;
  isAdminFiles: any = false;

  isImageLoad: boolean[] = [];
  loadingpdf: boolean = false;

  constructor(
    private uploadService: UploadMediaService,
    private localstorageService: LocalStorageService,
    private sanitzer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingFile = true;
    if (this.localstorageService.get('documents')) {
      this.documents = this.localstorageService.get('documents');
      this.loadingFile = false;
      return;
    }
    this.uploadService.importFile().subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.documents = response.body;
          console.log(this.documents);
          this.localstorageService.set('documents', this.documents);
          this.loadingFile = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.loadingFile = false;
      }
    );
  }

  file: File | undefined;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async uploadFile() {
    this.myloading = true;
    this.uploadService.uploadFFile(this.file).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          if (this.file?.type.split('/')[1] !== 'pdf') {
            this.documents.push(response.body.url);
            this.localstorageService.set('documents', this.documents);
          } else {
            this.pdfs.push(response.body.url);
            this.localstorageService.set('pdfs', this.pdfs);
          }

          this.loadingOp = false;
          this.myloading = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Erfolgreicher Upload',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.loadingOp = false;
        this.myloading = false;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ein Fehler ist aufgetreten',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  importPdf() {
    this.loadingpdf = true;
    this.isImage = false;
    this.isAdminFiles = false;
    this.isPdf = true;
    if (this.localstorageService.get('pdfs')) {
      setTimeout(() => {
        this.pdfs = this.localstorageService.get('pdfs');
        this.loadingpdf = false;
        return;
      }, 3000);
    }
    this.uploadService.importPdf().subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.pdfs = response.body;
          console.log(this.pdfs);
          this.localstorageService.set('pdfs', this.pdfs);
          this.isPdf = true;
          this.loadingpdf = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.isPdf = true;
        this.loadingpdf = false;
      }
    );
  }

  getImage() {
    this.isPdf = false;
    this.isAdminFiles = false;
    this.isImage = true;
  }

  safeUrl(url: any) {
    return this.sanitzer.bypassSecurityTrustResourceUrl(url);
  }

  delete(index: number) {
    this.loadingFile = true;
    var url = this.documents[index];

    var regex = /\/documents%2F([^?]+)/;
    var match = url.match(regex);

    if (match && match.length > 1) {
      var path = "documents/"+match[1];
      this.uploadService.deleteDocument(path).subscribe(
        (response:HttpResponse<any>)=>{
          if(response.status === 200){
            this.loadingFile = false;
            this.localstorageService.remove("documents");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Die Datei wurde gelöscht',
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(()=>{
              this.router.navigate(['/user/media']).then((r) => {
                window.location.reload();
              });
            },1500)

          }
        }
      )
      
    }
  }
}
