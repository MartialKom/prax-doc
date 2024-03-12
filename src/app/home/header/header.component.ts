import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginRequest } from 'src/app/models/login.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  submitted = false;
  loadingOp = false;

  loginRequest: LoginRequest | undefined ;
  
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)

  });


  constructor(private modalService: MatDialog){};


  openModal(content:any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal(){
    this.modalService.closeAll();
  }


  toLogin(){

    this.submitted = true;
    if (!this.loginForm.valid) {
      return
    }

    this.hideModal();
    this.loadingOp = true;

    this.loginRequest = new LoginRequest();

    this.loginRequest.username = (this.loginForm.get("username")!.value);
    this.loginRequest.password = (this.loginForm.get("password")!.value);

  }

}
