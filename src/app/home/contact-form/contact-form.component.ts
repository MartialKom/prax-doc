import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  submitted = false;
  loadingOp = false;

  contactForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email]),
  });

  constructor(private userService: UserService){}
  
  createContact(){
    this.submitted = true;
    if(!this.contactForm.valid){
      return;
    }

    this.loadingOp = true;

    const name = this.contactForm.get('name')!.value;
    const comment  = this.contactForm.get('comment')!.value;
    const email = this.contactForm.get('email')!.value;

    this.userService.createContactUs(comment, name,email).then(
      (response) => {
        this.loadingOp = false;
        if(response['name']){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Nachricht erfolgreich gesendet',
            showConfirmButton: false,
            timer: 3000,
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ein Fehler ist aufgetreten',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    )
  }

}
