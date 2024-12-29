import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { SwUpdate } from '@angular/service-worker';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from './shared/services/language/language.service';
import { TranslateService } from './shared/services/translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LanguageService, TranslateService],
})
export class AppComponent {
  public title = 'Extrusion Helper';
  public hrefViber: string;
  public updateAvailable: boolean = false;
  public promptEvent: any;
  public languageModalContainerProp = false;
  currentLang: string = '';

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    private sanitizer: DomSanitizer,
    private langService: LanguageService,
    private translateService: TranslateService
  ) {
    this.swUpdate.available.subscribe((evt) => {
      this.updateAvailable = true;
    });
    this.hrefViber = `viber://forward?text=${window.location.origin}`;

    this.langService.current.subscribe(
      (current) => (this.currentLang = current)
    );
    this.translateService.use(this.currentLang);
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void }) {
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
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  public reload() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  @ViewChild('myDrop') myDrop!: NgbDropdown;

  @HostListener('window:scroll') onScroll(e: Event): void {
    this.hideMenu();
    this.languageModalContainerProp = false;
  }

  btnRollWeightClick() {
    this.router.navigateByUrl('/roll-weight');
  }

  hideMenu() {
    this.myDrop.close();
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  languageModalContainer() {
    return this.languageModalContainerProp
      ? 'display: block;'
      : 'display: none;';
  }
  onCloseBtnClick() {
    this.languageModalContainerProp = false;
  }
  showLanguages() {
    this.languageModalContainerProp = true;
  }
  useLanguage(lang: string) {
    this.translateService.use(lang);
    this.languageModalContainerProp = false;
  }
}
