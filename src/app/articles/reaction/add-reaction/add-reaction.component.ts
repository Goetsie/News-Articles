import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reaction } from '../../models/reaction.model';
import { ReactionService } from '../../services/reaction.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-reaction',
  templateUrl: './add-reaction.component.html',
  styleUrls: ['./add-reaction.component.scss']
})
export class AddReactionComponent implements OnInit {

  @Input() articleID: number; // Recieve from parent (reaction component)
  @Output() reactionIsAdded = new EventEmitter<boolean>(); // Send to parent (reaction component)

  reaction: Reaction;

  constructor(private _reactionService: ReactionService) { }

  // Submit reaction
  onSubmit(addReactionForm: NgForm) {
    console.log("Add reaction:", this.reaction);
    this._reactionService.addReaction(this.reaction).subscribe(
      result => {
        if (result != null) {
          console.log("Reaction is added");
          this.reactionIsAdded.emit(true);
        }
      }
    ); // Don't forget to subscribe!
    addReactionForm.reset();
  }

  ngOnInit(): void {
    console.log("Add reaction articleID:", this.articleID);
    this.reaction = new Reaction(0, +localStorage.getItem("userID"), this.articleID, '', new Date());

  }

}
