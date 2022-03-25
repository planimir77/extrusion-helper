import { Component, HostListener, ViewChild } from '@angular/core';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Extrusion Helper';

  @ViewChild('myDrop') myDrop!: NgbDropdown;

  @HostListener('window:scroll') onScroll(e: Event): void {
    this.myDrop.close();
  }
}
