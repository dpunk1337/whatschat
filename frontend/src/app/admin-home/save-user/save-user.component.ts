import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment'
import { UserService } from '@app/_services/user.service';
import { GroupService } from '@app/_services/group.service';
import { Contact } from '@app/_models/contact.model'
import { User } from '@app/_models/user.model'
import { Group } from '@app/_models/group.model';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent {

  @Output() closeButtonClicked : EventEmitter<any> = new EventEmitter();
  @Output() newUserSaved : EventEmitter<any> = new EventEmitter();
  @Input() isEditMode : boolean = false;
  @Input() user : User = new User();

  constructor(private userService: UserService, private groupService: GroupService) {}

  ngOnInit() {

  }
  userName = "";

  closeMenu(){
    this.closeButtonClicked.emit();
  }

  moreVerticalMenuVisible = false;

  submitSaveUser(){
    if(this.userName == "")return;
    this.saveUser();
  }

  saveUser(){
//    this.userService.saveUser(this.userName, this.user.id).subscribe((created_user :User) => {
//      let id :number = created_user.id as number;
//      let name :string =  created_user.username as string;
//
////      let user = {
////        "id": id,
////        "name":this.userName,
////      }
//
//      this.newUserSaved.emit(user);
//      this.closeMenu();
//    });
  }

  deleteUser(){

  }

//  createMessage(message:string){
//    return {"id":1,"body":message,"me":true,"time":moment().format("LT")};
//  }

}
