import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  conversation:any;

  isCreateGroupMenuOpen = false;

  onConversationSelected(conversation:any){
    this.conversation = conversation;
  }

  closeCreateGroupMenu(){
    this.isCreateGroupMenuOpen = false;
  }

  openCreateGroupMenu(){
    this.isCreateGroupMenuOpen = true;
  }

  addConversation: any;

  onNewGroupAdded(event:any){
    this.addConversation = event;
  }

  isChatInfoOpen = false;

  closeChatInfo(){
    this.isChatInfoOpen = false;
  }

  openChatInfo(){
    this.isChatInfoOpen = true;
  }

}


