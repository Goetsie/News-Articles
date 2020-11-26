import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  tags: Tag[];

  @Output() public stringFilterOut = new EventEmitter();
  @Output() public tagFilter = new EventEmitter();

  stringFilter: string = "";

  selectable = true;
  removable = true;

  filterForm = this.fb.group({
    search: [''],
    tag: ['0']
  });

  tagName = this.filterForm.value.tag

  searchName: string = "";

  constructor(private _tagService: TagService, private fb: FormBuilder, private _articleService: ArticleService) {

    this._tagService.getTags()
      .pipe(
        tap(t => console.log(t))
      )
      .subscribe(
        result => {
          this.tags = result;
        });

  }

  // Find articles
  onSubmit() {
    console.log("Find articles");
    console.log("searchstring:", this.filterForm.value.search);
    console.log("Search tag:", this.filterForm.value.tag);

    this.stringFilterOut.emit(this.filterForm.value.search);
    this.tagFilter.emit(this.filterForm.value.tag);

  }

  ngOnInit(): void {
  }

}
