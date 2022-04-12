import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DensityComponent } from './components/density/density.component'

@NgModule({
  declarations: [
    DensityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DensityComponent,
  ]
})
export class SharedModule { }
