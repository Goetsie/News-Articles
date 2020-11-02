import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  public tagList: Array<Tag> = [];

  constructor(private _httpClient: HttpClient) { }

    // GET -- All tags
  //   getTags(){
  //     return this.http.get<User>("https://localhost:44348/api/Tag");
  // }

      // GET --> get all members
      getTags(): Observable<Tag[]> {
        // return this.http.get<Member[]>("https://localhost:44373/api/members", {
        //     headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
        // });
        return this._httpClient.get<Tag[]>("https://localhost:44348/api/Tag");
    }

}
