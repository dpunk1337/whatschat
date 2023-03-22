import { Component, EventEmitter, Output, ElementRef, ViewChild, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  conversations : any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private groupService: GroupService) {}

  ngOnInit(){
    if(this.authService.current_user){
      this.username = this.authService.current_user['username'];
    }
    else{
      this.logOut();
    }
    this.groupService.getUserConversations(this.authService.current_user['id']).subscribe((conversations :any) => {
      this.conversations = conversations;
    });
  }

  get filteredConversations(){
  return this.conversations.filter((conversation :any)=>{
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
      this.groupService.getUserConversations(this.authService.current_user['id']).subscribe((conversations :any) => {
        this.conversations = conversations;
      });
    }
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
