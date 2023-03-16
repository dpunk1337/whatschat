import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatHomeComponent } from './chat-home/chat-home.component';

import { SidebarComponent } from './chat-home/sidebar/sidebar.component';
import { ChatComponent } from './chat-home/chat/chat.component';
import { CreateGroupMenuComponent } from './chat-home/create-group-menu/create-group-menu.component';
import { ChatInfoComponent } from './chat-home/chat-info/chat-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatComponent,
    CreateGroupMenuComponent,
    ChatInfoComponent,
    LoginComponent,
    ChatHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
