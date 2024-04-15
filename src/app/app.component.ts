import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    initFlowbite();
    AOS.init();
  }
  title = 'prax-doc';
}
