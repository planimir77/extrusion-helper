import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  constructor() {
    if (!localStorage.getItem('lang')) {
      const localeLanguage = window.navigator.language.includes('bg')
        ? 'bg'
        : 'en';
      localStorage.setItem('lang', localeLanguage);
    }
    this.update(localStorage.getItem('lang') || 'en');
  }

  language = new BehaviorSubject(localStorage.getItem('lang') || 'en');

  current = this.language.asObservable();

  update(newLanguage: string){
    this.language.next(newLanguage);
    localStorage.setItem('lang', newLanguage);
  }

  

  // translate(page: string, words: string) {
  //   debugger;
  //   const target = this.current + page;
  //   // Load Service property
  //   const prop = Object.entries(this).find(([key, val]) => key === target)?.[1];

  //   return prop ? prop[words] : words;
  // }

  // bgapp: { [key: string]: string } = {
  //   'Tools': 'Инструменти',
  //   'Roll Weight': 'Тегло на ролката',
  //   'Bag Weight': 'Тегло на чантата',
  //   'Help Logo': 'Лого',
  //   'Choose language': 'Изберете език',
  //   'Update available. Click to refresh.':
  //   'Налична актуализация. Кликнете, за да опресните.',
  //   'lang flag': 'езиков флаг',
  //   'Install App': 'Инсталирайте приложението',
  //   'Application Logo': 'Лого на приложението',
  //   'Share the app via Viber': 'Споделете приложението чрез Viber',
  // };
  // bghome: { [key: string]: string } = {
  //   'Picture Loading...': 'Зарежда се изображение...',
  //   'Calculate the weight of the roll depending on the plastic used.': 'Изчислете теглото на ролка в зависимост от използваната пластмаса.',
  //   'Calculate the weight of the bag.': 'Изчислете теглото на чувал или чанта.',
  //   'Worker': 'Работник',
  // };
  // bgRollWeight: { key: string; value: string }[] = [
  //   { key: 'first', value: 'one' },
  //   { key: 'second', value: 'two' },
  // ];
}
