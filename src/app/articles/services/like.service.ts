import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  public likeList: Array<Like> = [];

  constructor(private _httpClient: HttpClient) { }


  // GET --> get all likes
  getLikes(): Observable<Like[]> {
    return this._httpClient.get<Like[]>("https://localhost:44348/api/Like");
  }

  // POST --> post a new Like on an article
  addLike(like: Like) {
    console.log("User with id:", like.userID, "likes article with id:", like.articleID);
    return this._httpClient.post<Like>("https://localhost:44348/api/Like", like);
  }

  // DELETE --> delete the like of a user
  deleteLike(likeID: number) {
    return this._httpClient.delete<Like>("https://localhost:44348/api/Like/" + likeID.toString());
  }

}
