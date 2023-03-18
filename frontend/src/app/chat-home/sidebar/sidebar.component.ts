import { Component, EventEmitter, Output, ElementRef, ViewChild, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { LoginComponent } from '../auth/login.component';
import { LoginComponent } from '../../auth/login.component';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GroupService } from '@app/_services/group.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

@Injectable()
export class SidebarComponent {

  username: any;

  searchText:any;

  @ViewChild('sidebarMoreVerticalMenu') sidebarMoreVerticalMenu!: ElementRef;

  moreVerticalMenuVisible = false;

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

  @Output() openCreateNewGroupMenu: EventEmitter<any> = new EventEmitter();

  conversations = [{"name":"Harry Ron","time":"12:30 PM","latestMessage":"Hey, mate. What's up?","latestMessageStatusId":0,"messages":[{"id":1,"body":"Hey, mate. What's up?","me":false,"time":"12:30 PM"},{"id":2,"body":"Nothing much. Just hanging out at home. You?","me":true,"time":"12:35 PM"},{"id":3,"body":"Same here. Want to grab some lunch?","me":false,"time":"12:40 PM"},{"id":4,"body":"Sure, where do you want to go?","me":true,"time":"12:45 PM"},{"id":5,"body":"How about that new burger place on Main Street?","me":false,"time":"12:50 PM"},{"id":6,"body":"Sounds good to me. What time?","me":true,"time":"12:55 PM"},{"id":7,"body":"How about 1:30?","me":false,"time":"1:00 PM"},{"id":8,"body":"Perfect. See you there!","me":true,"time":"1:05 PM"}]},{"name":"Hermione Granger","time":"9:15 AM","latestMessage":"Did you finish the essay for Professor Snape?","latestMessageStatusId":1,"messages":[{"id":9,"body":"Did you finish the essay for Professor Snape?","me":true,"time":"9:15 AM"},{"id":10,"body":"No, I'm still working on it. I'm having trouble with the last paragraph.","me":false,"time":"9:20 AM"},{"id":11,"body":"What part are you stuck on?","me":true,"time":"9:25 AM"},{"id":12,"body":"I'm not sure how to tie in the conclusion to the rest of the essay.","me":false,"time":"9:30 AM"},{"id":13,"body":"Have you tried using a quote from the book to wrap it up?","me":true,"time":"9:35 AM"},{"id":14,"body":"That's a good idea. Thanks, Hermione!","me":false,"time":"9:40 AM"}]},{"name":"Tony Stark","time":"10:00 AM","latestMessage":"Are you coming to the party tonight?","latestMessageStatusId":2,"messages":[{"id":15,"body":"Are you coming to the party tonight?","me":false,"time":"10:00 AM"},{"id":16,"body":"Yeah, I'll be there. What time does it start?","me":true,"time":"10:05 AM"},{"id":17,"body":"Around 8 o'clock. Don't be late!","me":false,"time":"10:10 AM"},{"id":18,"body":"Got it. I'll make sure to bring my dancing shoes!","me":true,"time":"10:15 AM"}]},{"name":"Jack Dawson","time":"7:00 PM","latestMessage":"Meet me at the clock on the first class deck","latestMessageStatusId":0,"messages":[{"id":19,"body":"Meet me at the clock on the first class deck","me":false,"time":"7:00 PM"},{"id":20,"body":"Why? What's going on?","me":true,"time":"7:05 PM"},{"id":21,"body":"I have something to show you. Just trust me.","me":false,"time":"7:10 PM"},{"id":22,"body":"Okay, I'll be there in a few minutes.","me":true,"time":"7:15 PM"}]},{"name":"Mia Wallace","time":"9:30 PM","latestMessage":"Do you know what they call a Quarter Pounder with Cheese in Paris?","latestMessageStatusId":3,"messages":[{"id":23,"body":"Do you know what they call a Quarter Pounder with Cheese in Paris?","me":false,"time":"9:30 PM"},{"id":24,"body":"I have no idea. What do they call it?","me":true,"time":"9:35 PM"},{"id":25,"body":"A Royale with Cheese.","me":false,"time":"9:40 PM"},{"id":26,"body":"That's hilarious! I love it.","me":true,"time":"9:45 PM"}]},{"name":"Harry Potter","time":"11:00 AM","latestMessage":"What are you up to today?","latestMessageStatusId":1,"messages":[{"id":27,"body":"What are you up to today?","me":false,"time":"11:00 AM"},{"id":28,"body":"Not much, just studying for my O.W.L.s. How about you?","me":true,"time":"11:05 AM"},{"id":29,"body":"I have Quidditch practice later. Want to come watch?","me":false,"time":"11:10 AM"},{"id":30,"body":"Sure, I'll be there. What time?","me":true,"time":"11:15 AM"}]},{"name":"Elle Woods","time":"3:00 PM","latestMessage":"I just aced my final exam!","latestMessageStatusId":2,"messages":[{"id":31,"body":"I just aced my final exam!","me":false,"time":"3:00 PM"},{"id":32,"body":"Congratulations! That's amazing!","me":true,"time":"3:05 PM"},{"id":33,"body":"Thanks! I couldn't have done it without your help.","me":false,"time":"3:10 PM"},{"id":34,"body":"Anytime! You're going to make an amazing lawyer.","me":true,"time":"3:15 PM"}]},{"name":"Han Solo","time":"8:30 PM","latestMessage":"Meet me at the cantina in Mos Eisley.","latestMessageStatusId":1,"messages":[{"id":35,"body":"Meet me at the cantina in Mos Eisley.","me":false,"time":"8:30 PM"},{"id":36,"body":"Why? What's going on?","me":true,"time":"8:35 PM"},{"id":37,"body":"I have a job for us. It pays well.","me":false,"time":"8:40 PM"},{"id":38,"body":"Count me in. I'll be there in an hour.","me":true,"time":"8:45 PM"}]},{"name":"Andy Dufresne","time":"1:00 PM","latestMessage":"Hey, do you want to grab lunch today?","latestMessageStatusId":2,"messages":[{"id":39,"body":"Hey, do you want to grab lunch today?","me":false,"time":"1:00 PM"},{"id":40,"body":"Sure, where do you want to go?","me":true,"time":"1:05 PM"},{"id":41,"body":"How about that new Mexican place downtown?","me":false,"time":"1:10 PM"},{"id":42,"body":"Sounds good to me. What time?","me":true,"time":"1:15 PM"},{"id":43,"body":"How about 12:30?","me":false,"time":"1:20 PM"},{"id":44,"body":"Perfect. See you there!","me":true,"time":"1:25 PM"}]},{"name":"Forrest Gump","time":"4:00 PM","latestMessage":"Jenny's coming to town this weekend!","latestMessageStatusId":3,"messages":[{"id":45,"body":"Jenny's coming to town this weekend!","me":false,"time":"4:00 PM"},{"id":46,"body":"No way! We have to get together!","me":true,"time":"4:05 PM"},{"id":47,"body":"Definitely. How about we all go to that new seafood place by the pier?","me":false,"time":"4:10 PM"},{"id":48,"body":"Sounds great! What day?","me":true,"time":"4:15 PM"},{"id":49,"body":"Saturday night work for everyone?","me":false,"time":"4:20 PM"},{"id":50,"body":"Works for me. What time?","me":true,"time":"4:25 PM"},{"id":51,"body":"How about we meet there at 7?","me":false,"time":"4:30 PM"},{"id":52,"body":"Perfect. Can't wait!","me":true,"time":"4:35 PM"}]},{"name":"Harry Potter","time":"2:00 PM","latestMessage":"Ron and Hermione are coming to visit this weekend.","latestMessageStatusId":2,"messages":[{"id":54,"body":"Ron and Hermione are coming to visit this weekend.","me":false,"time":"2:00 PM"},{"id":55,"body":"Great! We'll have to plan something fun to do.","me":true,"time":"2:05 PM"},{"id":56,"body":"Definitely. How about we take a trip to Hogsmeade?","me":false,"time":"2:10 PM"},{"id":57,"body":"Sounds like a plan. What day works for everyone?","me":true,"time":"2:15 PM"},{"id":58,"body":"How about Sunday afternoon?","me":false,"time":"2:20 PM"},{"id":59,"body":"Perfect. Let's meet at the Three Broomsticks at 1:00.","me":true,"time":"2:25 PM"},{"id":60,"body":"Looking forward to it!","me":false,"time":"2:30 PM"}]},{"name":"Michael Corleone","time":"8:00 PM","latestMessage":"I need your help with a business deal.","latestMessageStatusId":1,"messages":[{"id":61,"body":"I need your help with a business deal.","me":false,"time":"8:00 PM"},{"id":62,"body":"Of course. What do you need me to do?","me":true,"time":"8:05 PM"},{"id":63,"body":"I need you to negotiate with the Tattaglias for me.","me":false,"time":"8:10 PM"},{"id":64,"body":"Consider it done. When do you want me to meet with them?","me":true,"time":"8:15 PM"},{"id":65,"body":"Tomorrow afternoon at 2:00. I'll send you the details.","me":false,"time":"8:20 PM"},{"id":66,"body":"Got it. I'll be ready.","me":true,"time":"8:25 PM"}]},{"name":"Indiana Jones","time":"3:00 PM","latestMessage":"I found a map to the lost city of Zerzura.","latestMessageStatusId":2,"messages":[{"id":68,"body":"I found a map to the lost city of Zerzura.","me":false,"time":"3:00 PM"},{"id":69,"body":"That's incredible! When do we leave?","me":true,"time":"3:05 PM"},{"id":70,"body":"As soon as possible. I'll meet you at the airport tomorrow.","me":false,"time":"3:10 PM"},{"id":71,"body":"Sounds good. What time is our flight?","me":true,"time":"3:15 PM"},{"id":72,"body":"We leave at 6:00 AM. Don't be late.","me":false,"time":"3:20 PM"},{"id":73,"body":"I won't. See you then!","me":true,"time":"3:25 PM"}]},{"name":"Ellen Ripley","time":"9:00 PM","latestMessage":"The alien is loose on the ship.","latestMessageStatusId":1,"messages":[{"id":74,"body":"The alien is loose on the ship.","me":false,"time":"9:00 PM"},{"id":75,"body":"Oh no. Do you have a plan?","me":true,"time":"9:05 PM"},{"id":76,"body":"I'm going to try to trap it in the airlock.","me":false,"time":"9:10 PM"},{"id":77,"body":"Be careful. We're all counting on you.","me":true,"time":"9:15 PM"},{"id":78,"body":"I will. See you on the other side.","me":false,"time":"9:20 PM"}]}]

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private groupService: GroupService) {}

  ngOnInit(){
    this.username = this.authService.current_user['username'];
    this.groupService.getUserConversations(this.authService.current_user['id']).subscribe((conversations :any) => {
      this.conversations = conversations;
    });
  }

  get filteredConversations(){
  return this.conversations.filter((conversation)=>{
      return conversation.name.toLowerCase().includes(this.searchText.toLowerCase());
    })
  }

  toggleMoreVerticalMenuVisible() {
    this.moreVerticalMenuVisible= !this.moreVerticalMenuVisible;
  }

  closeMoreVerticalMenuVisible() {
    this.moreVerticalMenuVisible= false;
  }

  @HostListener('document:click, [$event]')
  onDocumentClick(event: MouseEvent ){
    console.log("is menu visible ", this.moreVerticalMenuVisible)
    if(this.moreVerticalMenuVisible && !this.sidebarMoreVerticalMenu.nativeElement.contains(event.target)){
      this.moreVerticalMenuVisible=false;
    }
  }

  onOpenNewGroupCreateMenu(){
    this.closeMoreVerticalMenuVisible();
    this.openCreateNewGroupMenu.emit();
  }

  @Input() addConversation!: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['addConversation'] && changes['addConversation'].currentValue) {
      let newConversation = changes['addConversation'].currentValue;
      this.conversations.unshift(newConversation);
      console.log(JSON.stringify(newConversation));
    }
  }

//  logOut() {
//    this.closeMoreVerticalMenuVisible();
//    this.http.get('http://localhost:5000/logout').subscribe((datas: any) => {
//      console.log(datas);
//    });
//  }

//  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logout().subscribe(() => {
      sessionStorage.removeItem('username');
      this.router.navigate(['/login']);
    });
  }
}
