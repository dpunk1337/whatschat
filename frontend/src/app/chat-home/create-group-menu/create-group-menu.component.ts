import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment'
import { UserService } from '@app/_services/user.service';
import { GroupService } from '@app/_services/group.service';
import { Contact } from '@app/_models/contact.model'
import { User } from '@app/_models/user.model'
import { Group } from '@app/_models/group.model';

@Component({
  selector: 'app-create-group-menu',
  templateUrl: './create-group-menu.component.html',
  styleUrls: ['./create-group-menu.component.scss']
})
export class CreateGroupMenuComponent {
  @Output() closeButtonClicked : EventEmitter<any> = new EventEmitter();
  @Output() newGroupAdded : EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService, private groupService: GroupService) {}

  ngOnInit() {
      this.contacts = this.userService.getAllContacts();
  }

  contacts : Contact[] = [];

  closeMenu(){
    this.closeButtonClicked.emit();
  }

  searchText: any;
  groupName = "";

  moreVerticalMenuVisible = false;

  get filteredContacts(){
  return this.contacts.filter((contacts)=>{
      return (contacts.mobileNumber?.toString().includes(this.searchText.toString())
      || contacts.name?.toLowerCase().includes(this.searchText.toLowerCase()));
    })
  }

  submitCreateGroup(){
    if(this.groupName == "")return;
    this.createGroup();
    this.closeMenu();
  }

  createGroup(){
    let participantsList = this.getNewGroupParticipantsList();
    let participantsIdList = this.getIdListFrom(participantsList);
    let participantsNameList = this.getNameListFromContacts(participantsList);
    let welcomeMessage = "Welcome to my new group "+ participantsNameList.join(", ") + ".";
    let firstMessage = this.createMessage(welcomeMessage);
    let conversation = {
    "name":this.groupName,
    "time":moment().format("LT"),
    "latestMessage":"Group created.",
    "latestMessageStatusId":0,
    "messages":[firstMessage,],
    "groupParticipants": participantsList
    }
    this.groupService.createGroup(this.groupName, participantsIdList).subscribe((created_group :Group) => {
      let id :number = created_group.id as number;
      let name :string =  created_group.name as string;
      let members :User[] = created_group.members as User[];
      console.log("group created with id and name", id, name, members);
    });
    this.newGroupAdded.emit(conversation);
  }

  createMessage(message:string){
    return {"id":1,"body":message,"me":true,"time":moment().format("LT")};
  }

  getNewGroupParticipantsList(){
    return this.contacts.filter((contacts)=>{
      return contacts.isSelected;
    })
  }

  getIdListFrom(contacts: any){
    let idList:number[] = [];
    contacts.forEach( (contact:any) => {
      idList.push(contact.id);
    });
    return idList;
  }

  getNameListFromContacts(contacts: any){
    let namesList:string[] = [];
    contacts.forEach( (contact:any) => {
      namesList.push(contact.name);
    });
    return namesList;
  }
}
