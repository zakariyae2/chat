import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChatPage } from './cont/loby/chat/chat.page';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./pages/forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'loby',
    loadChildren: () => import('./cont/loby/loby.module').then( m => m.LobyPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'chat-box',
    loadChildren: () => import('./components/chat-box/chat-box.module').then( m => m.ChatBoxPageModule)
  },
  {
    path: 'empty-screen',
    loadChildren: () => import('./components/empty-screen/empty-screen.module').then( m => m.EmptyScreenPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./components/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'loby/chats/:id',
    component: ChatPage,
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
