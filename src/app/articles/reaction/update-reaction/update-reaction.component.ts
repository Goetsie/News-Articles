import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reaction } from '../../models/reaction.model';
import { ReactionService } from '../../services/reaction.service';

@Component({
  selector: 'app-update-reaction',
  templateUrl: './update-reaction.component.html',
  styleUrls: ['./update-reaction.component.scss']
})
export class UpdateReactionComponent implements OnInit {

  @Input() reactionEdit: Reaction; // Recieve from parent (reaction component)
  @Output() reactionIsUpdated = new EventEmitter<boolean>(); // Send to parent (reaction component)

  constructor(private _reactionService: ReactionService) { }

  ngOnInit(): void {
  }

  updateReaction() {
    console.log("Update the reaction:", this.reactionEdit);
    this.reactionEdit.date = new Date();
    this._reactionService.updateReaction(this.reactionEdit.reactionID, this.reactionEdit).subscribe(
      reslut =>{
        console.log("Reaction update:", reslut);
      }
    );
    this.reactionIsUpdated.emit(true);
  }

}
