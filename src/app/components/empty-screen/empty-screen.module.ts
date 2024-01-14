import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmptyScreenPageRoutingModule } from './empty-screen-routing.module';

import { EmptyScreenPage } from './empty-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmptyScreenPageRoutingModule
  ],
  declarations: [EmptyScreenPage]
})
export class EmptyScreenPageModule {}
