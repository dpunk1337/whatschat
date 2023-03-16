import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent {
  @Input() conversation : any;

  @Output() closeButtonClicked : EventEmitter<any> = new EventEmitter();
  @Output() newGroupAdded : EventEmitter<any> = new EventEmitter();

  FRESH_CONTACTS = [{"id":1,"name":"Harry Ron","mobileNumber":6371798813,"isSelected":false},{"id":2,"name":"Hermione Granger","mobileNumber":8457694336,"isSelected":false},{"id":3,"name":"Tony Stark","mobileNumber":9472954430,"isSelected":false},{"id":4,"name":"Jack Dawson","mobileNumber":7186037556,"isSelected":false},{"id":5,"name":"Mia Wallace","mobileNumber":7313270452,"isSelected":false},{"id":6,"name":"Harry Potter","mobileNumber":8108825014,"isSelected":false},{"id":7,"name":"Elle Woods","mobileNumber":6258588199,"isSelected":false},{"id":8,"name":"Han Solo","mobileNumber":7558711986,"isSelected":false},{"id":9,"name":"Andy Dufresne","mobileNumber":7385252080,"isSelected":false},{"id":10,"name":"Forrest Gump","mobileNumber":7786530630,"isSelected":false},{"id":11,"name":"Harry Potter","mobileNumber":6113648499,"isSelected":false},{"id":12,"name":"Michael Corleone","mobileNumber":8875078582,"isSelected":false},{"id":13,"name":"Indiana Jones","mobileNumber":8127179725,"isSelected":false},{"id":14,"name":"Ellen Ripley","mobileNumber":8928006907,"isSelected":false}];

  contacts = this.FRESH_CONTACTS;

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
    "messages":[firstMessage,]
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversation'] && changes['conversation'].currentValue) {
      if(changes['conversation'].previousValue
      && changes['conversation'].previousValue['name']==changes['conversation'].currentValue['name']) return;
      if(!this.conversation['groupParticipants']) return;
      this.contacts = JSON.parse(JSON.stringify(this.FRESH_CONTACTS));
      this.updateContacts();
    }
  }

  updateContacts(){
    let groupParticipants =  this.conversation['groupParticipants'];
    groupParticipants.forEach((groupParticipant:any) => {
      let index = this.contacts.findIndex(element => element["id"]===groupParticipant["id"]);
      if (index !== -1) {
        this.contacts.splice(index, 1);
      }
    });
    this.contacts = groupParticipants.concat(this.contacts);
  }

  onMembershipChange(contact:any){
    if(contact.isSelected){
      this.conversation['groupParticipants'].push(contact);
    }
    else{
      let index = this.conversation['groupParticipants'].findIndex((element: any) => element["id"]===contact["id"]);
      if(index!=-1) this.conversation['groupParticipants'].splice(index, 1);
    }
  }
}
