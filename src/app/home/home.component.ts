import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    screenWidth: number | undefined;

  constructor() { 
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize() {
          this.screenWidth = window.innerWidth;
    }
}
