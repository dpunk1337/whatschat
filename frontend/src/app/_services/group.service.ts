import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Group } from '@app/_models/group.model';
import { User } from '@app/_models/user.model';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    getAll() {
      return this.http.get<Group[]>(`${environment.apiUrl}/users`);
    }

    createGroup(name :string, idList :number[]) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let body = {'name' : name, 'ids' : idList}
      return this.http.post<Group>(`${environment.apiUrl}/create_group`, body, { headers });
    }

    getGroupMembers(id :number) {
      let body = new FormData();
      body.append('id', id.toString());
      return this.http.post<User[]>(`${environment.apiUrl}/getGroupMembers`, body);
    }

    addGroupMember(group_id :number, user_id :number) {
      let body = new FormData();
      body.append('group_id', group_id.toString());
      body.append('user_id', user_id.toString());
      return this.http.post<User[]>(`${environment.apiUrl}/addGroupMember`, body);
    }

    removeGroupMember(group_id :number, user_id :number) {
      let body = new FormData();
      body.append('group_id', group_id.toString());
      body.append('user_id', user_id.toString());
      return this.http.post<User[]>(`${environment.apiUrl}/removeGroupMember`, body);
    }

    getUserConversations(id :number) {
      let body = new FormData();
      body.append('id', id.toString());
      return this.http.post<any[]>(`${environment.apiUrl}/getMemberConversations`, body);
    }

    getGroupMessages(id :number) {
      let body = new FormData();
      body.append('id', id.toString());
      return this.http.post<any[]>(`${environment.apiUrl}/getGroupMessages`, body);
    }

    sendGroupMessage(message :any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let body = JSON.stringify(message);
      return this.http.post<any[]>(`${environment.apiUrl}/addGroupMessage`, body, {headers});
    }

    poll(self :any): Observable<any[]> {
      return timer(0, environment.chatPollMillis).pipe(
        switchMap(() => {
          let body = new FormData();
          body.append('id', self.conversation['id'].toString());
          return this.http.post<any[]>(`${environment.apiUrl}/getGroupMessages`, body)
        })
      );
    }

}
