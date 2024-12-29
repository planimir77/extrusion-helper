import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BagWeightComponent } from './bag-weight.component';
import { BagWeightRoutingModule } from './bag-weight-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from '../shared/services/translate/translate.pipe';



@NgModule({
  declarations: [
    BagWeightComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BagWeightRoutingModule,
  ],
  exports: [
    BagWeightComponent
  ],
  providers: [TranslatePipe]
})
export class BagWeightModule { }
