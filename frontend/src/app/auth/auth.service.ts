import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  current_user : any;

  login(username: string,password: string) {
    let remember_me = false;
    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('remember_me', new Boolean(false).toString());
    return this.http.post('/api/login', body).pipe(
      tap( (data:any ) => {
        this.current_user = data['user'];
      })
    );
  }

  logout() {
    return this.http.get('/api/logout').pipe(
      tap( () => {
        this.current_user = null;
      })
    );;
  }

  isAuthenticated() {
    return sessionStorage.getItem('username') !== null;
  }
}
