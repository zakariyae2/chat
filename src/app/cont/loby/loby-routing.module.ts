import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobyPage } from './loby.page';

const routes: Routes = [
  {
    path: '',
    component: LobyPage
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LobyPageRoutingModule {}
