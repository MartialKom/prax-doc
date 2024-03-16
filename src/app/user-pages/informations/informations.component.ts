import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss'],
})
export class InformationsComponent implements OnInit {
  userData: any;
  submittedUsername: boolean = false;
  submittedEmail: boolean = false;
  submittedName: boolean = false;
  submittedPassword: boolean = false;
  loadingModif: boolean = false;

  usernameForm = new FormGroup({
    username: new FormControl(null, Validators.required),
  });

  emailForm = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
  });

  nameForm = new FormGroup({
    name: new FormControl(null, Validators.required),
  });
  passwordForm = new FormGroup({
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, [Validators.required]),
  });

  constructor(
    private localstorageService: LocalStorageService,
    private modalService: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const data = this.localstorageService.get('user');

    if (data) {
      this.userData = data;
    } else
      this.router.navigate(['/home']).then((r) => {
        window.location.reload();
      });
  }

  hideModal() {
    this.modalService.closeAll();
  }
  openModal(content: any): void {
    const dialogRef = this.modalService.open(content);
  }
  modify(attribut: string) {
    var body: any = ' ';

    if (attribut === 'username') {
      this.submittedUsername = true;

      if (!this.usernameForm.valid) {
        return;
      }
      this.loadingModif = true;

      body = {
        username: this.usernameForm.get('username')!.value,
      };
    } else if(attribut === 'email'){
      this.submittedEmail = true;

      if(!this.emailForm.valid) return;

      this.loadingModif = true;
      body = {
        email: this.emailForm.get('email')!.value,
      }
    } else if(attribut === 'name'){
      this.submittedName = true;

      if(!this.nameForm.valid) return;

      this.loadingModif =true;

      body = {
        name: this.nameForm.get('name')!.value,
      }
    }

    this.userService.updateAccount(body).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.loadingModif = false;
          this.localstorageService.set('user', response.body);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Erfolgreiche Änderung',
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/user/profile/info']).then((r) => {
              window.location.reload();
            });
          }, 2000);
        } else {
        }
      },
      (error: HttpErrorResponse) => {
        this.loadingModif = false;
        if (error.status === 400) {
          console.log(error.error.errorMessage);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Das alte Passwort ist nicht das richtige',
            showConfirmButton: false,
            timer: 3000,
          });
        } else
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Fehler, keine Verbindung möglich',
            showConfirmButton: false,
            timer: 3000,
          });
      }
    );
  }
}
