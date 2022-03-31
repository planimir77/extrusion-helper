import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Extrusion Helper';
  
  constructor(private router: Router) {}

  @ViewChild('myDrop') myDrop!: NgbDropdown;

  @HostListener('window:scroll') onScroll(e: Event): void {
    this.hideMenu();
  }

  btnRollWeightClick(){
    this.router.navigateByUrl('/roll-weight');
  }

  hideMenu(){
    this.myDrop.close();
  }
}
