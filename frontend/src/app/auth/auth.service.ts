import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string,password: string) {
    let remember_me = false;
    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('remember_me', new Boolean(false).toString());
    return this.http.post('/api/login', body);
  }

  logout() {
    return this.http.get('/api/logout');
  }

  isAuthenticated() {
    return sessionStorage.getItem('username') !== null;
  }
}
