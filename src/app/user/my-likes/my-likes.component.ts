import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ArticleService } from 'src/app/articles/article.service';
import { Article } from 'src/app/articles/models/article.model';
import { Like } from 'src/app/articles/models/like.model';
import { LikeService } from 'src/app/articles/services/like.service';

@Component({
  selector: 'app-my-likes',
  templateUrl: './my-likes.component.html',
  styleUrls: ['./my-likes.component.scss']
})
export class MyLikesComponent implements OnInit {

  articles: Article[];
  likedArticles: Like[];
  likedArticleIDs = new Array();

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'subTitle', 'actions'];

  constructor(private _articleService: ArticleService, private _likeService: LikeService, private router: Router, private snackBar: MatSnackBar) {

    this._likeService.getLikes()
      .pipe(
        map(likes => likes.filter(like => like.userID == parseInt(localStorage.getItem("userID")))), // Get all the likes of the logged in user
        tap(t => console.log("Likes of the articles that the user likes:", t))
      )
      .subscribe(
        result => {
          if (result == null) {
            this.likedArticles = null;
          } else {
            this.likedArticles = result;
            for (let o of this.likedArticles) {
              this.likedArticleIDs.push(o.articleID);
            }
            console.log("Liked Article ID's (array):", this.likedArticleIDs);
          }
        });

    this._articleService.getArticles()
      .pipe(
        map(articles => articles.filter(article => this.likedArticleIDs.includes(article.articleID) ? true : false)), // Only get the articles that the user has liked
        tap(t => console.log("Articles I like out of likedArticleID's:", t))
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
        });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editArticle(articleID) {
    console.log("User want to edit article with id:", articleID);
    this.router.navigate(['/update-article', { id: articleID }]);
  }

  ngOnInit(): void {
  }

  showArticle(id: number) {
    console.log("Show article:", id);
    this.router.navigate(['/articles', id]);
  }

  dislikeArticle(id: number) {
    console.log("Dislike article", id);
    let like: Like;

    for (let o of this.likedArticles) {
      if (o.articleID = id) {
        if (o.userID.toString() == localStorage.getItem("userID")) {
          like = o;
          console.log("LikeID:", like.likeID);
        }
      }
    }

    this._likeService.deleteLike(like.likeID).subscribe(
      result => {
        console.log("Like deleted:", result);
        // Remove disliked article from html table datasource
        this.dataSource = this.articles.filter(item => item.articleID !== like.articleID);
        this.openSnackBar("The article is disliked", "Undo", like);
      }
    );

  }

  // Snackbar
  openSnackBar(message, action, like: Like) {
    console.log("Like in snack", like);
    let snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    // Dismissed
    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dimissed");
    });

    // Action
    snackBarRef.onAction().subscribe(() => {
      console.log("The snackbar action was triggerd");
      if (action != "Dismiss") {

        console.log("The snackbar action was triggerd");

        this._likeService.addLike(new Like(0, like.userID, like.articleID)).subscribe(
          () => {
            this.snackBar.open("Action is undone", 'Dismiss', { duration: 3000 });
            // Re-like the article & Re-make the list
            this._likeService.addLike(like)
              .subscribe(
                () => {
                  this.snackBar.open("The action is undone!", "Dismiss", { duration: 5000 });
                });
            this._articleService.getArticles()
              .pipe(
                map(articles => articles.filter(article => article.articleID in this.likedArticleIDs)), // Only get the articles that the user has liked
              )
              .subscribe(
                result => {
                  if (result.length != 0) {
                    this.dataSource = result;
                    this.snackBar.open("The action is undone!", "Dismiss", { duration: 5000 });
                  }
                });
          }

        );
      }
    });

  }

}
