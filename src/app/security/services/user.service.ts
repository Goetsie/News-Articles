import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    // POST --> add a new user
    addUser(user: User){
      return this.http.post<User>("https://localhost:44348/api/User", user);
  }

  //   // Get --> role by id
  //   getRoleByID(id){
  //     return this.http.get<Role>("https://localhost:44348/api/Role/", id);
  // }

}
