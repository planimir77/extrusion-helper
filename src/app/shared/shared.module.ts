import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DensityComponent } from './components/density/density.component';
import { TranslatePipe } from './services/translate/translate.pipe'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DensityComponent,
    TranslatePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    DensityComponent,
    TranslatePipe,
  ]
})
export class SharedModule { }
