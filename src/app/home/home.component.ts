import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgWidth!: number;
  imgHeight!: number;

  constructor() {
    this.setImageSize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  setImageSize() {
    this.imgWidth = window.innerWidth;

    this.imgHeight = this.imgWidth < 575
      ? parseInt((this.imgWidth / 1.2).toFixed()) : this.imgWidth < 699
        ? parseInt((this.imgWidth / 1.4).toFixed()) : parseInt((this.imgWidth / 1.753).toFixed());
  }
}
