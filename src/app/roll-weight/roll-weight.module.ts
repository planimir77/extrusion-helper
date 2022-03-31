import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RollWeightRoutingModule } from './roll-weight-routing.module';
import { RollWeightComponent } from './roll-weight.component';


@NgModule({
  declarations: [
    RollWeightComponent
  ],
  imports: [
    CommonModule,
    RollWeightRoutingModule
  ]
})
export class RollWeightModule { }
