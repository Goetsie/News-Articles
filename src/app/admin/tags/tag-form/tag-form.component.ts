import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reaction } from 'src/app/articles/models/reaction.model';
import { Tag } from 'src/app/articles/models/tag.model';
import { TagService } from 'src/app/articles/services/tag.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {

  tag: Tag = new Tag(0, '', '');
  @Input() tagEdit: Tag; // Recieve from parent (tags component)
  @Input() update: boolean;
  @Output() tagFormCompleted = new EventEmitter<boolean>(); // Send to parent (tag component)


  submitted = false;

  constructor(private _tagService: TagService) {

    console.log("tagform", this.update);
    if (this.tagEdit) {
      console.log("update");
      this.tag = this.tagEdit;
    }
  }

  ngOnInit(): void {
    if (this.update) {
      this.tag = this.tagEdit;
    }
  }

  onSubmit() {
    console.log("Admin wants to create a new tag or update an article");
    if (this.update) {
      // Update a tag
      this._tagService.updateTag(this.tag.tagID, this.tag).subscribe(
        result => {
          console.log("Update tag:", result)
        },
        error => {
          alert("There are some problems right now. Try again later.");
          console.log("error:", error);
        },
        () => {
          console.log("Update tag completed");
          this.tag = new Tag(0, '', '');
          this.tagFormCompleted.emit(true);
        }
      );
    } else {
      // Add a tag
      this._tagService.addTag(this.tag).subscribe(
        result => {
          console.log("Add tag:", result)
        },
        error => {
          alert("There are some problems right now. Try again later.");
          console.log("error:", error);
        },
        () => {
          console.log("Add tag completed");
          this.tag = new Tag(0, '', '');
          this.tagFormCompleted.emit(true);
        }
      );
    }




  }

}
