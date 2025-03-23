import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageRoutingModule } from './landing-page-routing.module';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    LandingPageRoutingModule
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
