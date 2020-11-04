import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Reaction } from '../models/reaction.model';
import { ReactionService } from '../services/reaction.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

  @Input() articleID: number; // Recieve from parent
  
  reactions: Reaction[];
  userID = localStorage.getItem("userID");

  edit_reaction = false;
  reactionEdit = Reaction;


  constructor(private _reactionService: ReactionService) { }

  ngOnInit(): void {
    console.log("ArticleID in reaction nogOnInit", this.articleID);
    this._reactionService.getReactions(this.articleID)
    .pipe(
      tap(t => console.log("Reactions on this article:", t))
    )
    .subscribe(
      result => {
        this.reactions = result;
      });
  }

  editReaction(reaction){
    console.log("User wants to edit his reaction with id:", reaction.reactionID);
    
    // Extra check to see if the reaction is from the logged in user
    if(this.userID == reaction.userID){
      this.reactionEdit = reaction;
    }else{
      alert("Something went wrong! Cannot update this reaction.");
    }

    // Set the reaction to the edit state (show in the editform)
    this.edit_reaction = true;

  }

  onReactionUpdated(updated: boolean){
    console.log("Reaction is updated in DB");
    this.edit_reaction = false;
  }

  deleteReaction(reaction){
    console.log("User wants to delete his reaction with id:", reaction.reactionID);

    // Extra check to see if the reaction is from the logged in user
    if(this.userID == reaction.userID){
      this._reactionService.deleteReaction(reaction.reactionID).subscribe();
    }else{
      alert("Something went wrong! Cannot delete this reaction.");
    }
  }

}
