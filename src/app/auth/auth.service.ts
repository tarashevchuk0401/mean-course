import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';
  private authStatusListener = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
      return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    return this.http.post('http://localhost:3000/api/user/signup', authData)
  }

  login(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
     const token = response.token;
     this.token = token;
      this.authStatusListener.next(true);
    })
  }
}