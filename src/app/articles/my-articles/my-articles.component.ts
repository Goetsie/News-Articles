import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit {

  articles: Article[];
  userRole = null;

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'subTitle', 'articleStatusID', 'actions'];

  constructor(private _articleService: ArticleService, private router: Router, private snackBar: MatSnackBar) {
    this._articleService.getArticles()
      .pipe(
        map(articles => articles.filter(article => article.userID == parseInt(localStorage.getItem("userID")))), // Only get the of the user that is logged in
        tap(t => console.log("My articles:", t))
      )
      .subscribe(
        result => {
          this.articles = result;

          this.dataSource = new MatTableDataSource(this.articles);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editArticle(articleID) {
    console.log("User wants to edit article with id:", articleID);
    this.router.navigate(['/update-article', { id: articleID }]);
  }

  removeArticle(articleID: number) {
    console.log("User wants to delete this article with id:", articleID);
    this._articleService.deleteArticle(articleID).subscribe(
      result => {
        console.log("Article with id:", result.articleID, "is deleted!");
        this.dataSource = this.articles.filter(item => item.articleID !== articleID);
        this.openSnackBar("Article: '" + result.title + "' is deleted!", "Undo", result);
      });
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
  }

  // Snackbar
  openSnackBar(message, action, article: Article) {

    let snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    // Dismissed
    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dimissed");
    });

    // Action
    snackBarRef.onAction().subscribe(() => {
      console.log("The snackbar action was triggerd");
      if (action != "Dismiss") {

        console.log("The snackbar action was triggerd and is no 'Dismiss'");
        console.log("Re-add the article");
        // Re-add the article of the journalist
        delete (article.tag); delete (article.user); delete (article.articleStatus); article.articleID = 0;
        this._articleService.addArticle(article).subscribe(
          result => {
            console.log("The article is re-added:", result);
            this.snackBar.open("The action is undone!", "Dismiss", { duration: 5000 });
            this._articleService.getArticles()
              .pipe(
                map(articles => articles.filter(article => article.userID == parseInt(localStorage.getItem("userID")))), // Only get the of the user that is logged in
              ).subscribe(
                result => {
                  this.articles = result;
                  this.dataSource = result;
                }
              );
          }

        );
      }
    });

  }

}



