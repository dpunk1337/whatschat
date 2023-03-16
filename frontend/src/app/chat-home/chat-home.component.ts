import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent {
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
