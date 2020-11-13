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
  addUser(user: User) {
    return this.http.post<User>("https://localhost:44348/api/User", user);
  }

  // GET --> get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:44348/api/User");
  }

  // GET --> get one users
  getUser(id): Observable<User> {
    return this.http.get<User>("https://localhost:44348/api/User/" + id);
  }

  // PUT --> update an user
  updateUser(userID: number, user: User) {
    return this.http.put<User>("https://localhost:44348/api/User/" + userID, user);
  }

  // POST --> add a new user
  deleteUser(userID: number) {
    return this.http.delete<User>("https://localhost:44348/api/User/" + userID.toString());
  }

  //   // Get --> role by id
  //   getRoleByID(id){
  //     return this.http.get<Role>("https://localhost:44348/api/Role/", id);
  // }

}
