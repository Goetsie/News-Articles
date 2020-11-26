import { ArrayType } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs/operators';
import { ArticleService } from 'src/app/articles/article.service';
import { Article } from 'src/app/articles/models/article.model';
import { ShowArticleDialogComponent } from './show-article-dialog/show-article-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-to-review',
  templateUrl: './to-review.component.html',
  styleUrls: ['./to-review.component.scss']
})
export class ToReviewComponent implements OnInit {

  articles: Article[];
  article: Article;

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'subTitle', 'user.name', 'tagID', 'actions'];

  constructor(private _articleService: ArticleService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this._articleService.getArticles()
      .pipe(
        map(articles => articles.filter(article => article.articleStatusID == 2)), // Only get the article who needs a review
        tap(t => console.log("My articles:", t))
      )
      .subscribe(
        result => {
          if (result.length == 0) {
            this.articles = null;
          } else {
            this.articles = result;
          }

          this.dataSource = new MatTableDataSource(this.articles);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // Change the colums where the filter must filter
          this.dataSource.filterPredicate = function (data, filter: string): boolean {
            return data.title.toLowerCase().includes(filter) || data.subTitle.toLowerCase().includes(filter)
              || data.tag.name.toLowerCase().includes(filter) || data.user.firstName.toLowerCase().includes(filter)
              || data.user.lastName.toLowerCase().includes(filter);
          }
        });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showArticle(article) {
    console.log("Admin wants to see the article:", article);

    let dialogRef = this.dialog.open(ShowArticleDialogComponent, { data: { article: article } });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);

      // Discard the article
      if (result == "discard") {
        // Article back to draft so journalist can change the article
        article.articleStatusID = 3;
        delete (article.articleStatus);
        console.log("Admin wants to discard article with id:", article.articleID);
        console.log("Admin wants to discard article:", article);
        this._articleService.updateArticle(article.articleID, article).subscribe(
          () => {
            console.log("Article is discarded (back to draft)");
            this.openSnackBar("Article is discarded", "Undo", article);
          }
        );
      }

      // Publish the article
      else if (result == "publish") {
        // Publisch the article
        article.articleStatusID = 1;
        delete (article.articleStatus);
        console.log("Publish article:", article);
        this._articleService.updateArticle(article.articleID, article).subscribe(
          () => {
            console.log("Article is published");
            this.dataSource = this.articles.filter(item => item.articleID !== article.articleID); // Remove the published article from the table
            this.openSnackBar("Article is published", "Undo", article);
          }
        );
      } else {
        // Closing the dialog means do nothing
        this.snackBar.open("Status of article isn't changed!", "", { duration: 5000 });
      }
    });

  }

  // Snackbar
  openSnackBar(message, action, article: Article) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dimissed");
    });

    snackBarRef.onAction().subscribe(() => {

      if (action != "Dismiss") {

        console.log("The snackbar action was triggerd");

        // Undo the action
        article.articleStatusID = 2; // Set back to 'to review'
        this._articleService.updateArticle(article.articleID, article).subscribe(
          () => {
            this.snackBar.open("Action is undone", 'Dismiss', { duration: 3000 });
          }
        );

        // Re-make the list
        this._articleService.getArticles()
          .pipe(
            map(articles => articles.filter(article => article.articleStatusID == 2)), // Only get the article who needs a review
          )
          .subscribe(
            result => {
              if (result.length != 0) {
                this.dataSource = result;
              }
            });
      }
    });

  }

  ngOnInit(): void {
  }

}
