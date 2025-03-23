import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,

    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
