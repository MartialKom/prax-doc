import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginRequest } from 'src/app/models/login.model';
import { RegisterRequest } from 'src/app/models/register.model';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authServices/login.service';
import { FormatDateService } from 'src/app/services/commons/format-date.service';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  submitted = false;
  loadingOp = false;
  isAuth = false;
  successmsg = false;
  errormsg = false;
  errorMessage: any;
  userData: any;
  
  loginRequest: LoginRequest | undefined ;
  registerRequest: RegisterRequest | undefined;
  
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)

  });

  registerForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),

  });


  userInitial: any;



  constructor(private modalService: MatDialog, 
    private loginservice: LoginService,
    private localstorageService: LocalStorageService,
    private formatDateService: FormatDateService,
    private router: Router){}
    
    ngOnInit(): void {
      const userData =  this.localstorageService.get('user');
      if(userData){
        this.isAuth=true;
        this.userInitial = userData.username.charAt(0).toUpperCase();
        this.userData = userData;
      }
  }


  formatDate(date:string):string {
    return this.formatDateService.format(date);
};

  openModal(content:any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal(){
    this.modalService.closeAll();
  }


  async toLogin(){

    this.submitted = true;
    if (!this.loginForm.valid) {
      return
    }

    this.hideModal();
    this.loadingOp = true;

    this.loginRequest = new LoginRequest();

    this.loginRequest.username = (this.loginForm.get("username")!.value);
    this.loginRequest.password = (this.loginForm.get("password")!.value);

     this.loginservice.login(this.loginRequest).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        
        this.isAuth = true;
        console.log(response.body);
        this.router.navigate(['/home']).then(r => {
          this.loadingOp=false;
          window.location.reload();
      });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Sie sind authentifiziert",
          showConfirmButton: false,
          timer: 3000
        });

        this.userInitial = response.body.username.charAt(0).toUpperCase();
        this.userData = response.body;
        this.localstorageService.set("user", response.body) 
      }
    }, (error: HttpErrorResponse) => {

      if(error.status === 404){
        console.log(error.error.errorMessage);
      }
      
      this.loadingOp = false;

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Fehler, keine Verbindung möglich",
        showConfirmButton: false,
        timer: 3000
      });
      
    });

  }

  async toLogOut(){
    this.loadingOp = true;
    this.localstorageService.remove("user");
    this.localstorageService.remove("documents");
    
    this.router.navigate(['/home']).then(r => {
      this.loadingOp=false;
      window.location.reload();
  });

  }

  async toRegister(){
    this.submitted = true;
    if (!this.registerForm.valid) {
      return
    }

    this.hideModal()
    this.loadingOp = true;

    this.registerRequest = new RegisterRequest();

    this.registerRequest.email = this.registerForm.get("email")!.value;
    this.registerRequest.password = this.registerForm.get("password")!.value;
    this.registerRequest.username = this.registerForm.get("username")!.value;

    this.loginservice.register(this.registerRequest).subscribe((response: HttpResponse<any>)=>{
      if(response.status === 201){
        this.successmsg = true;
        this.loadingOp = false;

        this.isAuth = true;
        this.userInitial = response.body.username.charAt(0).toUpperCase(); 
        this.userData = response.body;

        this.localstorageService.set("user", response.body)
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sie sind authentifiziert',
        showConfirmButton: false,
        timer: 3000
      });

    }, (error: HttpErrorResponse)=>{
      console.log("erreur");
      this.loadingOp=false;
      this.errorMessage = error.error.errorMessage
      this.errormsg = true;

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ein Fehler ist aufgetreten',
        showConfirmButton: false,
        timer: 3000
      });
      

    })

    this.loadingOp = false;
  }



}
