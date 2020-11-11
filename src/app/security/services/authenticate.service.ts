import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  isLoggedin = new BehaviorSubject(false);

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  user = new BehaviorSubject(String);

  ifUser() {
    if (localStorage.getItem("userRole")) {
      return localStorage.getItem("userRole");
    } else {
      return false;
    }
  }

  constructor(private _httpClient: HttpClient) { }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>("https://localhost:44348/api/User/authenticate", userLogin);
  }

}