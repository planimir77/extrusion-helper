import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Extrusion Helper';
  public updateAvailable: boolean = false;
  
  constructor(private router: Router, private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(evt => {
      this.updateAvailable = true;
    });
  }

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

public reload() {
  this.swUpdate.activateUpdate().then(() => document.location.reload());
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
