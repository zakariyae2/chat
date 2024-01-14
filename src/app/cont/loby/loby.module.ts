import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobyPageRoutingModule } from './loby-routing.module';

import { LobyPage } from './loby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobyPageRoutingModule
  ],
  declarations: [LobyPage]
})
export class LobyPageModule {}
