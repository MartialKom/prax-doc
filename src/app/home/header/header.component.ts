import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login.model';
import { RegisterRequest } from 'src/app/models/register.model';
import { LoginService } from 'src/app/services/authServices/login.service';
import { FormatDateService } from 'src/app/services/commons/format-date.service';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  submitted = false;
  loadingOp = false;
  isAuth = false;
  successmsg = false;
  errormsg = false;
  errorMessage: any;
  userData: any;

  loginRequest: LoginRequest | undefined;
  registerRequest: RegisterRequest | undefined;

  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  registerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  userInitial: any;
  isMobileMenuOpen: boolean = false;


  constructor(
    private modalService: MatDialog,
    private loginservice: LoginService,
    private localstorageService: LocalStorageService,
    private formatDateService: FormatDateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = this.localstorageService.get('user');
    if (userData) {
      this.isAuth = true;
      this.userInitial = userData.name.charAt(0).toUpperCase();
      this.userData = userData;
    }
  }

  toogleMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  formatDate(date: string): string {
    return this.formatDateService.format(date);
  }

  openModal(content: any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal() {
    this.modalService.closeAll();
  }

  async toLogin() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.hideModal();
    this.loadingOp = true;

    this.loginRequest = new LoginRequest();

    this.loginRequest.username = this.loginForm.get('username')!.value;
    this.loginRequest.password = this.loginForm.get('password')!.value;

    this.loginservice
      .login(this.loginRequest)
      .then((response) => {
        this.loadingOp = false;
        if (response.name) {
          console.log('Response: ' + response);
          this.isAuth = true;
          this.userData = response;
          this.userInitial = this.userData.name.charAt(0).toUpperCase();
          this.localstorageService.set('user', this.userData);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sie sind authentifiziert',
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            if (response.labels[0] === 'admin' || response.labels[0] === 'doctor')
              this.router.navigate(['/user/dashboard/home']).then((r) => {
                window.location.reload();
              });
            else
              this.router.navigate(['/home']).then((r) => {
                window.location.reload();
              });
          }, 2000);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Falsche E-Mail oder falsches Passwort",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        this.loadingOp = false;
        console.error('Login failed', error);
      });
  }

  async toLogOut() {
    this.loadingOp = true;
    await this.loginservice.logout();
    setTimeout(() => {
      this.localstorageService.remove('user');
      this.localstorageService.remove('documents');
      this.localstorageService.remove('pdfs');
      this.localstorageService.remove('Appointments');
      this.localstorageService.remove('events');
      this.localstorageService.remove('text');

      this.router.navigate(['/home']).then((r) => {
        this.loadingOp = false;
        window.location.reload();
      });
    }, 3000);
  }

  async toRegister() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return;
    }

    this.hideModal();
    this.loadingOp = true;

    this.registerRequest = new RegisterRequest();

    this.registerRequest.email = this.registerForm.get('email')!.value;
    this.registerRequest.password = this.registerForm.get('password')!.value;
    this.registerRequest.name = this.registerForm.get('name')!.value;

    this.loginservice
      .register(this.registerRequest)
      .then((response) => {
        this.loadingOp = false;
        if (response.name) {
          console.log('Response: ' + response);
          this.isAuth = true;
          this.userData = response;
          this.userInitial = this.userData.name.charAt(0).toUpperCase();
          this.localstorageService.set('user', this.userData);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sie sind authentifiziert',
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/home']).then((r) => {
              window.location.reload();
            });
          }, 2000);
        } else
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Ein Fehler tritt auf",
            showConfirmButton: false,
            timer: 3000,
          });
      })
      .catch((error) => {
        this.loadingOp = false;
        console.error('Register failed', error);
      });
  }

  openProfile() {
    if(this.userData.labels[0] === 'admin' || this.userData.labels[0] === 'doctor')
    this.router.navigate(['/user/dashboard/home']).then((r) => {
      window.location.reload();
    });
    else
    this.router.navigate(['/user/profile/info']).then((r) => {
      window.location.reload();
    });
  }
}
