import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TagService } from 'src/app/articles/services/tag.service';
import { tap } from 'rxjs/operators';
import { Tag } from 'src/app/articles/models/tag.model';
import { ArticleService } from 'src/app/articles/article.service';
import { Article } from 'src/app/articles/models/article.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {


  tags: Tag[];
  tagEdit = Tag;
  showForm = false;
  update = false;


  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'actions'];

  constructor(private _tagService: TagService, private _articleService: ArticleService) {
    this._tagService.getTags()
      .pipe(
        tap(t => console.log("All tags:", t))
      )
      .subscribe(
        result => {
          this.tags = result;
          this.dataSource = new MatTableDataSource(this.tags);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(tag) {
    console.log("Admin wants to edit tag:", tag);
    this.tagEdit = tag;
    this.showForm = true;
    this.update = true;
  }

  newTag() {
    console.log("Admin wants to create a new tag");
    this.showForm = true;
  }

  onTagFormCompleted(updated: boolean) {
    console.log("Update or create completed, hide form");
    this.showForm = false;
    this.update = false;
  }

  ngOnInit(): void {
  }

}
