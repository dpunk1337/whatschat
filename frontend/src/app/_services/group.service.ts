import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Group } from '@app/_models/group.model';

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

}
