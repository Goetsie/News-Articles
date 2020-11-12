import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';
import { DialogComponent } from '../create-article/dialog/dialog.component';
@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {

  article: Article;
  submitted = false;
  tags: Tag[];

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

    if (this.route.snapshot.paramMap.get('id')) {
      const articleID = this.route.snapshot.paramMap.get('id');
      this._articleService.getArticle(articleID).subscribe(
        result => {
          this.article = result;
        });
    }
  }


  openDialog(toReview) {
    let dialogRef = this.dialog.open(DialogComponent, { data: { toReview: toReview } });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);
      if (result) {
        // Create new article
        console.log("New article");
        // this.article = new Article(0, '', '', '', '', null, parseInt(localStorage.getItem("userID")), 2);
        this.router.navigate(['/new-article']);
        this.submitted == false;
      } else {
        console.log("Navigate");
        // Navigate my-articles
        this.router.navigate(['/my-articles']);
      }
    });
  }

  onSubmit() {
    // Update article
    // Admin needs to review article before published
    this.submitted == true;
    this.article.articleStatusID = 2; // Set to "to review"
    console.log("User wants to update an article", this.article);
    this._articleService.updateArticle(this.article.articleID, this.article).subscribe(result => {
      console.log("Update article result:", result);
    });

    this.openDialog(true);
  }

  saveArticle() {
    if (this.article.tagID == null) {
      this.article.tagID = 1;
    }
    this.article.articleStatusID = 3; // Set to draft
    console.log("User wants to save his article", this.article);

    this._articleService.updateArticle(this.article.articleID, this.article)
      .subscribe(
        result => {
          // Handle result
          console.log("Update article result:", result)
        },
        error => {
          alert(error);
        },
        () => {
          console.log("Article update completed");
          this.openDialog(false);
        }
      );



  }

  ngOnInit(): void {
  }

}
