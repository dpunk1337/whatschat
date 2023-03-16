import { Component, Input, EventEmitter, Output, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() conversation:any;

  submitMessage(event:any){
    let message = event.target.value.trim();
    event.target.value = '';
    if(message == "")return;
    this.addMessage(message);
  }

  addMessage(message:string){
    let messageElement = {"id":1,"body":message,"me":true,"time":moment().format("LT")};
    this.conversation.messages.unshift(messageElement); // adding at the head of the array
    this.conversation.latestMessage=message;
    this.conversation.latestMessageStatusId=1;
    this.conversation.time=messageElement['time'];
  }

  @ViewChild('chatMoreVerticalMenu') chatMoreVerticalMenu!: ElementRef;

  moreVerticalMenuVisible = false;

  @Output() openChatInfoMenu: EventEmitter<any> = new EventEmitter();

    toggleMoreVerticalMenuVisible() {
    this.moreVerticalMenuVisible= !this.moreVerticalMenuVisible;
  }

  closeMoreVerticalMenuVisible() {
    this.moreVerticalMenuVisible= false;
  }

  @HostListener('document:click, [$event]')
  onDocumentClick(event: MouseEvent ){
    console.log("is menu visible ", this.moreVerticalMenuVisible)
    if(this.moreVerticalMenuVisible && !this.chatMoreVerticalMenu.nativeElement.contains(event.target)){
      this.moreVerticalMenuVisible=false;
    }
  }

  onOpenChatInfoMenu(){
    this.closeMoreVerticalMenuVisible();
    this.openChatInfoMenu.emit();
  }
}
