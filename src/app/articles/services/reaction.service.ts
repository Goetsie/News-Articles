import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Reaction } from '../models/reaction.model';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  public reactionList: Array<Reaction> = [];

  constructor(private _httpClient: HttpClient) { }

  // GET --> all reaction (filter later)
  getReactions(): Observable<Reaction[]> {
    return this._httpClient.get<Reaction[]>("https://localhost:44348/api/Reaction");
  }

  // POST --> post a new reaction on an article
  addReaction(reaction: Reaction) {
    console.log("Reaction to POST:", reaction);
    reaction.date = new Date(); // Update the date when the reaction actually is added
    return this._httpClient.post<Reaction>("https://localhost:44348/api/Reaction", reaction);
  }

  // PUT --> update a reaction of the user
  updateReaction(reactionID: number, reaction: Reaction) {
    return this._httpClient.put<Reaction>("https://localhost:44348/api/Reaction/" + reactionID, reaction);
  }

  // DELETE --> delete the reaction of a user
  deleteReaction(reactionID: number) {
    return this._httpClient.delete<Reaction>("https://localhost:44348/api/Reaction/" + reactionID.toString());
  }

}
