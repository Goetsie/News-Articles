import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  article: Article = new Article(0, '', '', '', '', null, parseInt(localStorage.getItem("userID")), 2); // 2--> to review 1-->safe
  tags: Tag[];
  submitted = false;

  constructor(private _tagService: TagService, private _articleService: ArticleService, public dialog: MatDialog, private router: Router) {
    this._tagService.getTags()
      .pipe(
        // map(res => {
        //   return res.slice(0,2); // Only show the first two members
        // }),
        tap(t => console.log(t))
      )
      .subscribe(
        result => {
          this.tags = result;
        });

  }

  ngOnInit(): void {
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);
      if (result == true) {
        // Create new article
        console.log("New article");
        this.article = new Article(0, '', '', '', '', null, parseInt(localStorage.getItem("userID")), 2);
        this.submitted == false;
      } else {
        console.log("Navigate");
        // Navigate my-articles
        this.router.navigate(['/my-articles']);
      }
    });
  }

  onSubmit() {
    this.submitted == true;
    console.log("User wants to submit a new article", this.article);
    this._articleService.addArticle(this.article).subscribe(result => {
      console.log("Add article result:", result);
    });
    this.openDialog();
  }

}
