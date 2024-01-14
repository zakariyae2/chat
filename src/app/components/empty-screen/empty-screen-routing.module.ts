import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmptyScreenPage } from './empty-screen.page';

const routes: Routes = [
  {
    path: '',
    component: EmptyScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmptyScreenPageRoutingModule {}
