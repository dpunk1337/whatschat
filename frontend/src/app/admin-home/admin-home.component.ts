import { Component, EventEmitter, Output, ElementRef, ViewChild, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '@app/_services/user.service';
import { User } from '@app/_models/user.model';

@Injectable()
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {

  username: any;

  searchText:any;

  @ViewChild('sidebarMoreVerticalMenu') sidebarMoreVerticalMenu!: ElementRef;

  moreVerticalMenuVisible = false;

  isSaveUserMenuOpen = false;

  users : User[] = [];

  openInEditMode = false;

  userToEdit : User = new User();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(){
    if(this.authService.current_user){
      this.username = this.authService.current_user['username'];
    }
    else{
      this.logOut();
    }
    this.getLatestUsers();
  }

  getLatestUsers() {
    this.userService.getAll().subscribe((users :User[]) => {
      this.users = users;
    });
  }

  get filteredUsers(){
    return this.users.filter((user :User)=>{
      return ( user.mobile_number?.toString().includes(this.searchText.toString())
      || user.username?.toLowerCase().includes(this.searchText.toLowerCase()));
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

  onOpenNewUserCreateMenu(){
    this.closeMoreVerticalMenuVisible();
    this.openInEditMode=false;
    this.userToEdit = new User();
    this.userToEdit['is_admin']= false;
    this.openSaveUserMenu();
  }

  onOpenUserEditMenu(user :User){
    this.openInEditMode=true;
    this.userToEdit = user;
    this.openSaveUserMenu();
  }

  openSaveUserMenu() {
    this.isSaveUserMenuOpen = true;
  }

  closeSaveUserMenu() {
    this.isSaveUserMenuOpen = false;
  }

  onNewUserAdded(user :User){
    this.getLatestUsers();
  }

  onUserDeleted(user :User){
    this.getLatestUsers();
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

