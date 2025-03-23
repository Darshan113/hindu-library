import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    CardModule,
    MenubarModule,
    DropdownModule,
    PasswordModule
  ]
})
export class PrimeNGModule { }
