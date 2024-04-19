import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {


  heroText: any;
  isLoadingHero: boolean = false;
  initialHero = {
    heroIndice: "",
    heroHeading1: "",
    heroHeading2: "",
    heroHeading3: "",
    heroHeadingText: "",
  }
  updateHero = {
    heroIndice: "",
    heroHeading1: "",
    heroHeading2: "",
    heroHeading3: "",
    heroHeadingText: "",
  }

  appointmentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email]),
  });

  submitted: boolean = false;

  isFrontEnd: boolean = false;
  
  openModal(content: any): void {
    if(this.isFrontEnd){
      const dialogRef = this.modalService.open(content);
    }
  }

  openAppointmentModal(content: any): void {
    if(!this.isFrontEnd){
      const dialogRef = this.modalService.open(content);
    }
  }

  hideAppointment(){
    this.modalService.closeAll();
  }
  
hideModal() {
  this.updateHero.heroIndice = this.heroText['hero-indice'];
  this.updateHero.heroHeading1 = this.heroText['hero-heading1'];
  this.updateHero.heroHeading2 = this.heroText['hero-heading2'];
  this.updateHero.heroHeading3 = this.heroText['hero-heading3'];
  this.updateHero.heroHeadingText = this.heroText['hero-headingText'];
  this.modalService.closeAll();
}



  constructor(private router: Router, private frontEndService: FrontEndService, private modalService: MatDialog,
    private storageService: LocalStorageService, private userService: UserService){
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  ngOnInit(): void {

    this.isLoadingHero = true;
    this.frontEndService.getHeroText().then(
      (response) =>{
        if(response[0].$id){
          this.storageService.set("text", response[0]);
          this.heroText = response[0];
          this.initialHero.heroIndice = this.heroText['hero-indice'];
          this.initialHero.heroHeading1 = this.heroText['hero-heading1'];
          this.initialHero.heroHeading2 = this.heroText['hero-heading2'];
          this.initialHero.heroHeading3 = this.heroText['hero-heading3'];
          this.initialHero.heroHeadingText = this.heroText['hero-headingText'];

          this.updateHero.heroIndice = this.heroText['hero-indice'];
          this.updateHero.heroHeading1 = this.heroText['hero-heading1'];
          this.updateHero.heroHeading2 = this.heroText['hero-heading2'];
          this.updateHero.heroHeading3 = this.heroText['hero-heading3'];
          this.updateHero.heroHeadingText = this.heroText['hero-headingText'];

        }
        this.isLoadingHero = false;
      }
    );
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  updateText(){
    this.isLoadingHero = true;
    this.frontEndService.updateHeroText(this.updateHero,this.heroText.$id).then(
      (response) =>{
        if(response.$id){
          location.reload()
        } else this.isLoadingHero = false;
      }
    )
  }

  createAppointment(){

    this.submitted = true;
    if (!this.appointmentForm.valid) {
      return;
    }
    this.isLoadingHero = true;
    const name = this.appointmentForm.get('name')?.value;
    const phone = this.appointmentForm.get('phone')?.value;
    const mail = this.appointmentForm.get('email')?.value;

    this.userService.createNonUserAppointment(name, phone, mail).then((response)=>{
      if(response.$id){
        this.hideAppointment();
        this.isLoadingHero = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Gesendete Anfrage',
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        this.isLoadingHero = false;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ein Fehler ist aufgetreten',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
  }

}
