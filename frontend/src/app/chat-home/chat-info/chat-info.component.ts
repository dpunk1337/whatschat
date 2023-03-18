import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '@app/_services/user.service';
import { GroupService } from '@app/_services/group.service';
import { User } from '@app/_models/user.model';
import { Contact } from '@app/_models/contact.model';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent {
  @Input() conversation : any;

  @Output() closeButtonClicked : EventEmitter<any> = new EventEmitter();
  @Output() newGroupAdded : EventEmitter<any> = new EventEmitter();

  contacts : Contact[] = [];

  closeMenu(){
    this.closeButtonClicked.emit();
  }

  searchText: any;
  groupName = "";

  moreVerticalMenuVisible = false;

  constructor(private userService: UserService, private groupService: GroupService) {}

  getContacts() {
    this.contacts = [];
    this.userService.getAll().subscribe((users: User[]) => {
      users.forEach( (user: User) => {
          this.contacts.push({
            'id': user.id as number,
            'name': user.username as string,
            'mobileNumber': user.mobile_number as number,
            'isSelected': false
          });
      });
      this.updateContacts();
    });
  }


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
      this.getContacts();
    }
  }

  updateContacts(){
    this.groupService.getGroupMembers(this.conversation['id']).subscribe((users: User[]) => {
      let groupParticipants : Contact[] = [];
      users.forEach((user: User) => {
        groupParticipants.push({
          'id': user.id as number,
          'name': user.username as string,
          'mobileNumber': user.mobile_number as number,
          'isSelected': true
        });
        let index = this.contacts.findIndex(element => element.id === user.id);
        if (index !== -1) {
          this.contacts.splice(index, 1);
        }
      });
      this.contacts = groupParticipants.concat(this.contacts);
    });
  }

  onMembershipChange(contact:any){
    if(contact.isSelected){
      this.groupService.addGroupMember(this.conversation['id'], contact.id).subscribe();
      this.conversation['groupParticipants'].push(contact);
    }
    else{
      this.groupService.removeGroupMember(this.conversation['id'], contact.id).subscribe();
      let index = this.conversation['groupParticipants'].findIndex((element: any) => element["id"]===contact["id"]);
      if(index!=-1) this.conversation['groupParticipants'].splice(index, 1);
    }
  }
}
