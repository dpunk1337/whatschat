import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    const currentUser = sessionStorage.getItem('current_user');
    if (currentUser) {
      this.current_user = JSON.parse(currentUser);
    }
  }

  current_user: any;

  login(username: string, password: string) {
    let remember_me = false;
    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('remember_me', new Boolean(false).toString());
    return this.http.post('/api/login', body).pipe(
      tap((data: any) => {
        this.current_user = data['user'];
        sessionStorage.setItem('current_user', JSON.stringify(this.current_user));
      })
    );
  }

  logout() {
    return this.http.get('/api/logout').pipe(
      tap(() => {
        this.current_user = null;
        sessionStorage.removeItem('current_user');
      })
    );
  }

  isAuthenticated() {
    return this.http.get('/api/is_authenticated').pipe(
      tap((data: any) => {
        if (data['is_authenticated']) {
          this.current_user = data['user'];
          sessionStorage.setItem('current_user', JSON.stringify(this.current_user));
        }
      })
    );
  }
}
