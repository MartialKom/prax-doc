import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { UploadMediaService } from 'src/app/services/mediaServices/upload-media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  loadingOp = false;
  myloading = false;
  documents = [];
loadingFile: boolean = false;


  constructor(private uploadService: UploadMediaService,
    private localstorageService: LocalStorageService){}

  ngOnInit(): void {
    this.loadingFile = true;
    if(this.localstorageService.get("documents")){
      this.documents = this.localstorageService.get("documents");
      this.loadingFile =false;
      return;
    }
    this.uploadService.importFile().subscribe((response:HttpResponse<any>) => {
      if(response.status === 200){
        this.documents = response.body;
        console.log(this.documents);
        this.localstorageService.set("documents", this.documents);
        this.loadingFile = false;
      }
    },(error: HttpErrorResponse)=>{
      this.loadingFile = false;
    })
  }

  file: File | undefined;
  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async uploadFile(){

    this.myloading=true;
    this.uploadService.uploadFFile(this.file).subscribe((response: HttpResponse<any>)=>{

      if(response.status === 200){
        this.loadingOp = false;
        this.myloading = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Erfolgreicher Upload",
          showConfirmButton: false,
          timer: 3000
        });
      }
    }, (error: HttpErrorResponse)=>{
      this.loadingOp = false;
      this.myloading = false;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Ein Fehler ist aufgetreten",
        showConfirmButton: false,
        timer: 3000
      });
    })
    
  }

}
