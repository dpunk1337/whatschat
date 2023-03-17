import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@app/_models/user.model';
import { Contact } from '@app/_models/contact.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getAllContacts() {
      let contacts: Contact[] = [];
      this.getAll().subscribe(users => {
        users.forEach( (user) => {
          contacts.push({
            'id': user.id as number,
            'name': user.username as string,
            'mobileNumber': user.mobile_number as number,
            'isSelected': false
          });
        });
      });
      return contacts;
    }
}
