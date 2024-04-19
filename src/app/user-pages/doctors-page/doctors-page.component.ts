import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DoctorRequest } from 'src/app/models/Doctors.model';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.scss'],
})
export class DoctorsPageComponent implements OnInit {
  doctorsData: any[] = [];
  doctorSelected: any[] = [];
  doctorSearchData: any[] = [];
  doctorToModify: any;
  loadingDoctors: boolean = false;
  avalaibleDoctors: number = 0;
  unavalaibleDoctors: number = 0;
  totalDoctors: number = 0;
  doctorRequest!: DoctorRequest;
  searchParam!: string;

  availablePercentage: number = 0;
  unavailablePercentage: number = 0;

  submitted: boolean = false;

  DoctorForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    speciality: new FormControl(null, Validators.required),
    contact: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  DoctorUpdateForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    speciality: new FormControl(null, Validators.required),
    contact: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  changeSearchparam(value: any) {
    this.searchParam = value.value;
    if (!value.value) {
      console.log(false);
    } else {
      console.log(true);
      this.doctorSearchData = this.doctorsData.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.searchParam.toLowerCase()) ||
          item.email.toLowerCase().includes(this.searchParam.toLowerCase()) ||
          item.contact.toLowerCase().includes(this.searchParam.toLowerCase()) ||
          item.speciality.toLowerCase().includes(this.searchParam.toLowerCase())
        );
        // Ajoutez d'autres critères de recherche au besoin
      });
    }
  }

  ngOnInit(): void {
    this.loadingDoctors = true;
    this.avalaibleDoctors = 0;
    this.unavalaibleDoctors = 0;
    this.doctorsData = [];

    try {
      this.userService.getAllDoctors().then((response) => {
        if (response) {
          this.doctorsData = response;

          for (let doc of response) {
            if (doc['available']) this.avalaibleDoctors += 1;
            else this.unavalaibleDoctors += 1;
          }

          this.totalDoctors = response.length;
          this.loadingDoctors = false;

          const percentUn = (this.unavalaibleDoctors/this.totalDoctors)*100;
          if(percentUn){
            this.unavailablePercentage = percentUn;
          }
          const percentAv = (this.avalaibleDoctors/this.totalDoctors)*100;
          
          if(percentAv) this.availablePercentage = percentAv;
          
        }
      });
    } catch (error) {
      this.loadingDoctors = false;
      return;
    }
  }

  constructor(
    private userService: UserService,
    private modalService: MatDialog
  ) {}

  openModal(content: any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal() {
    this.submitted = false;
    this.modalService.closeAll();
  }

  createDoctor() {
    this.submitted = true;

    if (!this.DoctorForm.valid) {
      return;
    }

    this.hideModal();

    this.loadingDoctors = true;

    this.doctorRequest = new DoctorRequest();

    this.doctorRequest.name = this.DoctorForm.get('name')?.value;
    this.doctorRequest.email = this.DoctorForm.get('email')?.value;
    this.doctorRequest.speciality = this.DoctorForm.get('speciality')?.value;
    this.doctorRequest.contact = this.DoctorForm.get('contact')?.value;

    this.userService.addDoctors(this.doctorRequest).then((response) => {
      if (response.$id) {
        this.DoctorForm.reset();
        this.ngOnInit();
      } else {
        this.loadingDoctors = false;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Es ist ein Fehler aufgetreten, bitte überprüfen Sie alle Informationen",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  getSelectedStatus(doctor: any) {
    if (doctor.selected === undefined) {
      doctor.selected = false;
      return false;
    } else return doctor.selected;
  }

  toogleSelection(doctor: any){
    if(doctor.selected === false){
      this.doctorSelected.push(doctor);
    } else {
      this.doctorSelected = this.doctorSelected.filter(element => element.$id != doctor.$id);
    }

    doctor.selected  = !doctor.selected;
    console.log("selected doctor: "+this.doctorSelected.toString());
  }

  delete(){
    Swal.fire({
      title: 'Sind Sie sicher?',
      text: 'Dass Sie dieses Bild löschen wollen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      cancelButtonText: 'Nein',
      confirmButtonText: 'Ja',
    }).then((result)=>{
      if(result.value){
        this.loadingDoctors = true;
        for(let doc of this.doctorSelected){

          this.userService.deleteDoctors(doc.$id).then(
            (result)=>{
              if(result){
                this.doctorSelected = [];
                
                this.ngOnInit();
              }
            }
          )
        }
        
      }else this.loadingDoctors =false;
    })
  }

  OpenModalDoctorUpdate(content:any, doctor: any){
    this.doctorToModify = doctor;
    this.openModal(content);
  }

  hideModalUpdate(){
    this.doctorToModify = {};
    this.hideModal();
  }

  updateDoctor(){
    this.submitted = true;

    if (!this.DoctorUpdateForm.valid) {
      return;
    }

    this.loadingDoctors = true;

    this.hideModal();

     var updateData = {
      name: undefined,
      contact : undefined,
      email: undefined,
      speciality: undefined,
    };

    updateData.name = this.doctorToModify.name;
    updateData.contact = this.doctorToModify.contact;
    updateData.email = this.doctorToModify.email;
    updateData.speciality = this.doctorToModify.speciality;

    console.log("name: "+updateData.name);

    this.userService.updateDoctor(updateData, this.doctorToModify.$id).then(
      (result)=>{
        if(result){
          this.doctorToModify = undefined;
          this.ngOnInit();
        } else this.loadingDoctors = false;
      }
    )

  }
}
