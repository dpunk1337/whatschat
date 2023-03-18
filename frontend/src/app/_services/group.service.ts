import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Group } from '@app/_models/group.model';
import { User } from '@app/_models/user.model';

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

}
