import { Component, Input, EventEmitter, Output, ElementRef, ViewChild, HostListener, SimpleChanges } from '@angular/core';
import * as moment from 'moment'
import { AuthService } from '../../auth/auth.service';
import { GroupService } from '@app/_services/group.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() conversation:any;

  messages : any[] = [];

  current_user_id: number = -1;

  constructor(private authService: AuthService, private groupService: GroupService){}

  ngOnInit(){
    this.current_user_id = this.authService.current_user['id'];
    this.groupService.poll(this).subscribe((messages: any[]) => {
      this.setMessageContent(messages);
    });
  }

  submitMessage(event:any){
    let message = event.target.value.trim();
    event.target.value = '';
    if(message == "")return;
    this.addMessage(message);
  }

  addMessage(message:string){
    let messageElement = {
      "body":message,
      "me":true,
      "time":moment().format("LT"),
      "user_id":this.authService.current_user['id'],
      "group_id":this.conversation['id']
    };
    this.groupService.sendGroupMessage(messageElement).subscribe( () => {
      this.getMessages();
    });
    this.conversation.messages.unshift(messageElement); // adding at the head of the array
    this.conversation.latestMessage=message;
    this.conversation.latestMessageStatusId=1;
    this.conversation.time=messageElement['time'];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversation'] && changes['conversation'].currentValue) {
      if(changes['conversation'].previousValue
      && changes['conversation'].previousValue['name']==changes['conversation'].currentValue['name']) return;
      this.getMessages();
    }
  }

  getMessages() {
    this.groupService.getGroupMessages(this.conversation['id']).subscribe((messages: any[]) => {
      this.setMessageContent(messages);
    });
  }

  setMessageContent(messages: any[]) {
      this.messages = [];
      messages.forEach( (message: any) => {
          message['me']=(message['user_id']=== this.current_user_id);
      });
      this.messages=messages;
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
