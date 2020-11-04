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

}
