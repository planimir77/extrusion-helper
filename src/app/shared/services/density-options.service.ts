import { Injectable } from '@angular/core';
import { IDensityOption } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DensityOptionsService {

  private densityOptions: IDensityOption[] = [
    { key: 'Recycled LDPE', value: '0.88', },
    { key: 'LDPE', value: '0.923', },
    { key: 'LLDPE', value: '0.915', },
    { key: 'HDPE', value: '0.941', },
    { key: 'PP', value: '0.946', },
  ];

  constructor() { }

  getOptions() {
    return this.densityOptions;
  }
}
