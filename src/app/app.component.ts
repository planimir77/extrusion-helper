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

  public promptEvent: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
onbeforeinstallprompt(e: { preventDefault: () => void; }) {
  e.preventDefault();
  this.promptEvent = e;
}

public installPWA() {
  this.promptEvent.prompt();
}

public shouldInstall(): boolean {
  return !this.isRunningStandalone() && this.promptEvent;
}

public isRunningStandalone(): boolean {
  return (window.matchMedia('(display-mode: standalone)').matches);
}

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
