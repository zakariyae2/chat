import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatBoxPage } from './chat-box.page';

const routes: Routes = [
  {
    path: '',
    component: ChatBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBoxPageRoutingModule {}
