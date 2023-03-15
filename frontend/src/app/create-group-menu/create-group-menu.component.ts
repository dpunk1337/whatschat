import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-create-group-menu',
  templateUrl: './create-group-menu.component.html',
  styleUrls: ['./create-group-menu.component.scss']
})
export class CreateGroupMenuComponent {
  @Output() closeButtonClicked : EventEmitter<any> = new EventEmitter();
  @Output() newGroupAdded : EventEmitter<any> = new EventEmitter();

  contacts = [{"id":1,"name":"Harry Ron","mobileNumber":6371798813,"isSelected":false},{"id":2,"name":"Hermione Granger","mobileNumber":8457694336,"isSelected":false},{"id":3,"name":"Tony Stark","mobileNumber":9472954430,"isSelected":false},{"id":4,"name":"Jack Dawson","mobileNumber":7186037556,"isSelected":false},{"id":5,"name":"Mia Wallace","mobileNumber":7313270452,"isSelected":false},{"id":6,"name":"Harry Potter","mobileNumber":8108825014,"isSelected":false},{"id":7,"name":"Elle Woods","mobileNumber":6258588199,"isSelected":false},{"id":8,"name":"Han Solo","mobileNumber":7558711986,"isSelected":false},{"id":9,"name":"Andy Dufresne","mobileNumber":7385252080,"isSelected":false},{"id":10,"name":"Forrest Gump","mobileNumber":7786530630,"isSelected":false},{"id":11,"name":"Harry Potter","mobileNumber":6113648499,"isSelected":false},{"id":12,"name":"Michael Corleone","mobileNumber":8875078582,"isSelected":false},{"id":13,"name":"Indiana Jones","mobileNumber":8127179725,"isSelected":false},{"id":14,"name":"Ellen Ripley","mobileNumber":8928006907,"isSelected":false}];
  closeMenu(){
    this.closeButtonClicked.emit();
  }

  searchText: any;
  groupName = "";

  moreVerticalMenuVisible = false;

//  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

  get filteredContacts(){
  return this.contacts.filter((contacts)=>{
      return (contacts.mobileNumber.toString().includes(this.searchText.toString())
      || contacts.name.toLowerCase().includes(this.searchText.toLowerCase()));
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
