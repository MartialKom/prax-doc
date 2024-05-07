import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  contactData: any[] = [];
  contactSelected: any[] = [];
  loadingContact: boolean = false;
  selectedContact: any;
  statuses!: any[];

  constructor(private userService : UserService, private modalService: MatDialog){}
    
  ngOnInit(): void {
    
    this.loadingContact = true;

    this.statuses = [
      { label: 'READ', value: 1 },
      { label: 'UNREAD', value: 0 }
  ];

    this.userService.getContact().then(
      (response)=>{
        if(response){
          this.contactData = response;
          this.loadingContact = false;
        } else this.loadingContact = false;
      }
    )
  }

  getSeverity(status: string) {
    switch (status) {
        case 'UNREAD':
            return 'danger';

        case 'READ':
            return 'success';
        default:
          return undefined;
    }
}

  select(contact: any, content: any){
    this.selectedContact = contact;
    this.openModal(content);
  }
  openModal(content: any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal() {
    this.modalService.closeAll();
  }

  getSelectedStatus(contact: any) {
    if (contact.selected === undefined) {
      contact.selected = false;
      return false;
    } else return contact.selected;
  }

  toogleSelection(contact: any){
    if(contact.selected === false){
      this.contactSelected.push(contact);
    } else {
      this.contactSelected = this.contactSelected.filter(element => element.$id != contact.$id);
    }

    contact.selected  = !contact.selected;
    console.log("selected doctor: "+this.contactSelected.toString());
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
        this.loadingContact = true;
        for(let doc of this.contactSelected){

          this.userService.deleteContact(doc.$id).then(
            (result)=>{
              if(result){
                this.contactSelected = [];
                
                this.ngOnInit();
              }
            }
          )
        }
        
      }else this.loadingContact =false;
    })
  }

  read(id: any){

    this.loadingContact = true;

    this.userService.updateContactStatus(id).then(
      (response)=>{
        if(response.$id){
          this.ngOnInit();
        } else this.loadingContact = false;
      }
    )
  }
}
