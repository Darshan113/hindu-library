import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports: [
    CommonModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
