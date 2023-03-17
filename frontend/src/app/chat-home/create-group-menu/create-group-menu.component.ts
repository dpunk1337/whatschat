import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment'
import { UserService } from '@app/_services/user.service';
import { Contact } from '@app/_models/contact.model'

@Component({
  selector: 'app-create-group-menu',
  templateUrl: './create-group-menu.component.html',
  styleUrls: ['./create-group-menu.component.scss']
})
export class CreateGroupMenuComponent {
  @Output() closeButtonClicked : EventEmitter<any> = new EventEmitter();
  @Output() newGroupAdded : EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) {}

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

  getNameListFromContacts(contacts: any){
    let namesList:string[] = [];
    contacts.forEach( (contact:any) => {
      namesList.push(contact.name);
    });
    return namesList;
  }
}
