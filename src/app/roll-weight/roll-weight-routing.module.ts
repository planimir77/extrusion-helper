import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RollWeightComponent } from './roll-weight.component';

const routes: Routes = [{ path: '', component: RollWeightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RollWeightRoutingModule { }
