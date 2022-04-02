import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RollWeightRoutingModule } from './roll-weight-routing.module';
import { RollWeightComponent } from './roll-weight.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    RollWeightComponent
  ],
  imports: [
    CommonModule,
    RollWeightRoutingModule,
    NgbModule,
    FormsModule,
  ],
  bootstrap: [
    RollWeightComponent
  ]
})
export class RollWeightModule { }
