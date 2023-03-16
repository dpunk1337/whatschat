import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ChatHomeComponent } from './chat-home/chat-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatHomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'chat' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
