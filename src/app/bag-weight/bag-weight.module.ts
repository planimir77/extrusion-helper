import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BagWeightComponent } from './bag-weight.component';
import { BagWeightRoutingModule } from './bag-weight-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    BagWeightComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BagWeightRoutingModule,
    SharedModule,
    NgbModule
  ],
  exports: [
    BagWeightComponent
  ]
})
export class BagWeightModule { }
