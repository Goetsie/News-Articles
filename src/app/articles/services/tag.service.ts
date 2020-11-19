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

  // GET --> get all tags
  getTags(): Observable<Tag[]> {
    return this._httpClient.get<Tag[]>("https://localhost:44348/api/Tag");
  }

  // POST --> post a new tag
  addTag(tag: Tag) {
    console.log("Tag to POST:", tag);
    return this._httpClient.post<Tag>("https://localhost:44348/api/Tag", tag);
  }

  // PUT --> update a tag
  updateTag(tagID: number, tag: Tag) {
    return this._httpClient.put<Tag>("https://localhost:44348/api/Tag/" + tagID, tag);
  }

  // DELETE --> delete a tag
  deleteTag(tagID: number) {
    return this._httpClient.delete<Tag>("https://localhost:44348/api/Tag/" + tagID.toString());
  }


}
