import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BagWeightComponent } from './bag-weight.component';

const routes: Routes = [{ path: '', component: BagWeightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BagWeightRoutingModule { }
