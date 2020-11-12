import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _tagService: TagService, private _articleService: ArticleService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
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
    // if(this.route.snapshot.paramMap.get('id')){
    //   const articleID = this.route.snapshot.paramMap.get('id');
    //   this._articleService.getArticle(articleID).subscribe(
    //     result => {
    //       this.article = result;
    //     });
    // }

  }

  openDialog(toReview) {
    let dialogRef = this.dialog.open(DialogComponent, { data: { toReview: toReview } });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);
      if (result) {
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
    // Admin needs to review article before published
    this.submitted == true;
    console.log("User wants to submit a new article", this.article);
    this._articleService.addArticle(this.article).subscribe(
      result => {
        // Handle result
        console.log("Add article (to review) result:", result)
      },
      error => {
        alert("There are some problems right now. Try again later.");
        console.log("error");
      },
      () => {
        console.log("Article add (to review) completed");
        this.openDialog(true);
      }
    );

  }



  saveArticle() {
    if (this.article.tagID == null) {
      this.article.tagID = 1;
    }
    this.article.articleStatusID = 3; // Set to draft
    console.log("User wants to save his article", this.article);

    this._articleService.addArticle(this.article).subscribe(
      result => {
        // Handle result
        console.log("Add article result:", result)
      },
      error => {
        alert("There are some problems right now. Try again later.");
        console.log("error");
      },
      () => {
        console.log("Article add (draft) completed");
        this.openDialog(false);
      }
    );


  }

}
