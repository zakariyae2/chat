import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatBoxPageRoutingModule } from './chat-box-routing.module';

import { ChatBoxPage } from './chat-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBoxPageRoutingModule
  ],
  declarations: [ChatBoxPage]
})
export class ChatBoxPageModule {}
