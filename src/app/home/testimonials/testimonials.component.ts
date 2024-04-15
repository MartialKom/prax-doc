import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  loadingTestimonials: boolean = false;
  testimonialsText: any;

  index:number = 0;

  documents: any = [];
  selectedImage: any = '';
  selectedImageUrl: any = null;

  initialTestimonials = {
    testimonialsTitle: '',
    testimonialsText: '',
  };

  updateTestimonials = {
    testimonialsTitle: '',
    testimonialsText: '',
  };


  updateTestimonial1 = {
    'testimonialImage1': '',
    'testimonial1-name': '',
    'testimonial1-text': '',
  };


  updateTestimonial2 = {
    'testimonialImage2': '',
    'testimonial2-name': '',
    'testimonial2-text': '',
  };


  updateTestimonial3 = {
    'testimonialImage3': '',
    'testimonial3-name': '',
    'testimonial3-text': '',
  };

  testimonialToUpdate = {
    image: null,
    name: '',
    text: '',
  };

  isFrontEnd: boolean = false;

  constructor(
    private modalService: MatDialog,
    private router: Router,
    private frontEndService: FrontEndService,
    private storageService: LocalStorageService
  ) {
    this.router.events.subscribe((event) => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  ngOnInit(): void {
    this.loadingTestimonials = true;

    this.documents = this.storageService.get('documents');
    this.testimonialsText = this.storageService.get('text');

    const text = this.testimonialsText;

    if (text) {
      this.initialTestimonials.testimonialsText = text['testimonial-text'];
      this.initialTestimonials.testimonialsTitle = text['testimonial-title'];

      this.updateTestimonials.testimonialsText = text['testimonial-text'];
      this.updateTestimonials.testimonialsTitle = text['testimonial-title'];

      this.updateTestimonial1['testimonialImage1'] =
        text['testimonialImage1'];
      this.updateTestimonial1['testimonial1-text'] = text['testimonial1-text'];
      this.updateTestimonial1['testimonial1-name'] = text['testimonial1-name'];

      this.updateTestimonial2['testimonialImage2'] =
        text['testimonialImage2'];
      this.updateTestimonial2['testimonial2-text'] = text['testimonial2-text'];
      this.updateTestimonial2['testimonial2-name'] = text['testimonial2-name'];


      this.updateTestimonial3['testimonialImage3'] =
        text['testimonialImage3'];
      this.updateTestimonial3['testimonial3-text'] = text['testimonial3-text'];
      this.updateTestimonial3['testimonial3-name'] = text['testimonial3-name'];

      this.loadingTestimonials = false;
    } else {
      this.frontEndService.getHeroText().then((response) => {
        if (response[0].$id) {
          this.storageService.set('text', response[0]);
          const text = response[0];
          this.testimonialsText = response[0];

          this.initialTestimonials.testimonialsText = text['testimonial-text'];
          this.initialTestimonials.testimonialsTitle =
            text['testimonial-title'];

          this.updateTestimonials.testimonialsText = text['testimonial-text'];
          this.updateTestimonials.testimonialsTitle = text['testimonial-title'];

          this.updateTestimonial1['testimonialImage1'] =
            text['testimonialImage1'];
          this.updateTestimonial1['testimonial1-text'] =
            text['testimonial1-text'];
          this.updateTestimonial1['testimonial1-name'] =
            text['testimonial1-name'];


          this.updateTestimonial2['testimonialImage2'] =
            text['testimonialImage2'];
          this.updateTestimonial2['testimonial2-text'] =
            text['testimonial2-text'];
          this.updateTestimonial2['testimonial2-name'] =
            text['testimonial2-name'];

          this.updateTestimonial3['testimonialImage3'] =
            text['testimonialImage3'];
          this.updateTestimonial3['testimonial3-text'] =
            text['testimonial3-text'];
          this.updateTestimonial3['testimonial3-name'] =
            text['testimonial3-name'];
        }
        this.loadingTestimonials = false;
      });
    }
    this.router.events.subscribe((event) => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  openModal(content: any): void {
    if (this.isFrontEnd) {
      const dialogRef = this.modalService.open(content);
    }
  }

  openModalTestimonial(content: any, index: any) {
    if (this.isFrontEnd) {

      this.index = index;

      if (index === 1) {
        this.testimonialToUpdate.name =
          this.updateTestimonial1['testimonial1-name'];
        this.testimonialToUpdate.text =
          this.updateTestimonial1['testimonial1-text'];
      }

      if (index === 2) {
        this.testimonialToUpdate.name =
          this.updateTestimonial2['testimonial2-name'];
        this.testimonialToUpdate.text =
          this.updateTestimonial2['testimonial2-text'];
      }

      if (index === 3) {
        this.testimonialToUpdate.name =
          this.updateTestimonial3['testimonial3-name'];
        this.testimonialToUpdate.text =
          this.updateTestimonial3['testimonial3-text'];
      }

      const dialogRef = this.modalService.open(content);
    }
  }

  updateATestimonial(){

    this.loadingTestimonials = true;
    var data : any;

    if(this.index ===1) {
      data = {
        'testimonial1-name' : this.testimonialToUpdate.name,
        'testimonial1-text' : this.testimonialToUpdate.text,
        'testimonialImage1' : this.selectedImageUrl
      }
    }

    if(this.index ===2) {
      data = {
        'testimonial2-name' : this.testimonialToUpdate.name,
        'testimonial2-text' : this.testimonialToUpdate.text,
        'testimonialImage2' : this.selectedImageUrl
      }
    }

    if(this.index ===3) {
      data = {
        'testimonial3-name' : this.testimonialToUpdate.name,
        'testimonial3-text' : this.testimonialToUpdate.text,
        'testimonialImage3' : this.selectedImageUrl
      }
    }

    
    this.frontEndService
      .updateAtestimonial(
        data,
        this.testimonialsText.$id
      )
      .then((response) => {
        this.storageService.remove('text');
        if (response.$id) {
          location.reload();
        } else this.loadingTestimonials = false;
      });


  }

  imgSelect(id: any, url: any) {
    if (id === this.selectedImage) {
      this.selectedImage = '';
      this.selectedImageUrl = '';
    } else {
      this.selectedImage = id;
      this.selectedImageUrl = url;
    }
    console.log(this.selectedImage);
  }

  hideModal() {
    this.updateTestimonials.testimonialsText =
      this.initialTestimonials.testimonialsText;
    this.updateTestimonials.testimonialsTitle =
      this.initialTestimonials.testimonialsTitle;

    this.modalService.closeAll();
  }

  updateText() {
    this.loadingTestimonials = true;
    this.frontEndService
      .updateTestimonialsText(
        this.updateTestimonials,
        this.testimonialsText.$id
      )
      .then((response) => {
        this.storageService.remove('text');
        if (response.$id) {
          location.reload();
        } else this.loadingTestimonials = false;
      });
  }
}
