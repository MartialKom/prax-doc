import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  documents: any = [];
  pdfs: any = [];
  loadingFile: boolean = false;
  isImage: any = true;
  isPdf: any = false;
  isAdminFiles: any = false;

  isImageLoad: boolean[] = [];
  loadingpdf: boolean = false;

  isAdmin: boolean = false;

  constructor(
    private uploadService: UploadMediaService,
    private localstorageService: LocalStorageService,
    private sanitzer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingFile = true;
    
    const userData = this.localstorageService.get('user');
    if(userData.labels[0] === "admin") this.isAdmin = true;

    if (this.localstorageService.get('documents')) {
      this.documents = this.localstorageService.get('documents');
      this.loadingFile = false;
      return;
    }
    this.uploadService
      .importFile()
      .then((response) => {
        if (response) {
          this.documents = response;
          this.localstorageService.set('documents', this.documents);
          this.loadingFile = false;
        } else this.loadingFile = false;
      })
      .catch((error) => {
        this.loadingFile = false;
      });
  }

  file!: File;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async uploadFile() {
    this.myloading = true;
    this.uploadService.uploadFFile(this.file).then((response) => {
      if (response) {
        if (this.file?.type.split('/')[1] !== 'pdf') {
          this.documents.push(response);
          this.localstorageService.set('documents', this.documents);
        } else {
          this.pdfs.push(response);
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
      } else {
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
    });
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
    this.uploadService.importPdf().then((response) => {
      if (response) {
        this.pdfs = response;
        this.localstorageService.set('pdfs', this.pdfs);
        this.isPdf = true;
        this.loadingpdf = false;
      }
    });
  }

  getImage() {
    this.isPdf = false;
    this.isAdminFiles = false;
    this.isImage = true;
  }

  safeUrl(url: any) {
    return this.sanitzer.bypassSecurityTrustResourceUrl(url);
  }

  delete(id: string) {
    Swal.fire({
      title: 'Sind Sie sicher?',
      text: 'Dass Sie dieses Bild löschen wollen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      cancelButtonText: 'Nein',
      confirmButtonText: 'Ja',
    }).then((result) => {
      if (result.value) {
        this.loadingFile = true;
        if (id) {
          this.uploadService.deleteDocument(id).then((response) => {
            this.loadingFile = false;
            this.localstorageService.remove('documents');
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Die Datei wurde gelöscht',
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              this.router.navigate(['/user/media']).then((r) => {
                window.location.reload();
              });
            }, 1500);
          });
        }else this.loadingFile =false;
      }
    });
  }
}
