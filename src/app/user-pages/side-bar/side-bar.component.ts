import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/authServices/login.service';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {


  loadingOut: boolean = false;

  constructor(
    private localstorageService: LocalStorageService,
    private loginservice: LoginService,
    private router: Router,
  ) {}
  
  async toLogOut() {
    this.loadingOut = true;
    await this.loginservice.logout();
    setTimeout(() => {
      this.localstorageService.remove('user');
      this.localstorageService.remove('documents');
      this.localstorageService.remove('pdfs');
      this.localstorageService.remove('Appointments');
      this.localstorageService.remove('events');
      this.localstorageService.remove('text');

      this.router.navigate(['/home']).then((r) => {
        this.loadingOut = false;
        window.location.reload();
      });
    }, 3000);
  }
}
