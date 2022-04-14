import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BagWeightComponent } from './bag-weight.component';
import { BagWeightRoutingModule } from './bag-weight-routing.module';



@NgModule({
  declarations: [
    BagWeightComponent
  ],
  imports: [
    CommonModule,
    BagWeightRoutingModule
  ],
  exports: [
    BagWeightComponent
  ]
})
export class BagWeightModule { }
