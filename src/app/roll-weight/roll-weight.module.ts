import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RollWeightRoutingModule } from './roll-weight-routing.module';
import { RollWeightComponent } from './roll-weight.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RollWeightComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RollWeightRoutingModule,
  ],
  exports: [
    RollWeightComponent
  ]
})
export class RollWeightModule { }
