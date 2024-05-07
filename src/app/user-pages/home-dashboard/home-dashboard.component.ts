import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
})
export class HomeDashboardComponent implements OnInit {
  userData: any[] = [];
  myUserData: any[] = [];
  myPatientsId: any[] = [];
  docsData: any[] = [];
  loadingUsers: boolean = false;
  userVerified: number = 0;
  totalUsers: number = 0;
  totalDocs: number = 0;
  totalPdf: number = 0;
  totalImg: number = 0;
  isActiveUser = true;

  veriedUserPercentage: number = 0;
  imagePercentage: number = 0;
  pdfPercentage: number = 0;
  myPatientsPercentage: number = 0;

  isDoctor: boolean = false;

  constructor(
    private userService: UserService,
    private localstorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadingUsers = true;

    const userData = this.localstorageService.get('user');

    try {
      this.userService.getAllUser().then((response) => {
        if (response) {
          this.userData = response;

          for (let user of this.userData) {
            if (user.isVerified === true) this.userVerified += 1;
          }

          this.totalUsers = this.userData.length;

          const percentage = (this.userVerified / this.totalUsers) * 100;
          const mypercentage = (this.myUserData.length / this.totalUsers) * 100;

          if (mypercentage) this.myPatientsPercentage = Math.floor(mypercentage);

          if (percentage) this.veriedUserPercentage = Math.floor(percentage);
        }
      });
      if (userData.labels[0] === 'doctor') {
        this.userService.getAllAppointments().then((response) => {
          if (response) {
            for (let app of response) {
              this.myPatientsId.push(app['idUser']);
            }
            this.myUserData = this.userData.filter((element) =>
              this.myPatientsId.includes(element)
            );
          }
        });
        this.isDoctor = true;
        this.loadingUsers = false;
      }

      if (userData.labels[0] === 'admin')
        this.userService.getAllDoc().then((response) => {
          if (response) {
            this.totalPdf = 0;
            this.totalImg = 0;
            this.docsData = response;

            for (let doc of this.docsData) {
              if (doc.type === 'pdf') this.totalPdf += 1;
              else this.totalImg += 1;
            }

            this.totalDocs = this.docsData.length;

            const percent = (this.totalImg / this.totalDocs) * 100;

            if (percent) this.imagePercentage = Math.floor(percent);

            const percentPdf = (this.totalPdf / this.totalDocs) * 100;

            if (percentPdf) this.pdfPercentage = Math.floor(percentPdf);
          }
          this.loadingUsers = false;
        });
    } catch (error) {
      this.loadingUsers = false;
      return;
    }
  }
}
