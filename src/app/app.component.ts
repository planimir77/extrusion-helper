import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { SwUpdate } from '@angular/service-worker';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Extrusion Helper';
  public updateAvailable: boolean = false;
  hrefViber: string;
  
  constructor(
    private router: Router, 
    private swUpdate: SwUpdate,
    private sanitizer: DomSanitizer,
    ) {
    this.swUpdate.available.subscribe(evt => {
      this.updateAvailable = true;
    });
    this.hrefViber = `viber://forward?text=${window.location.origin }`;
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
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
