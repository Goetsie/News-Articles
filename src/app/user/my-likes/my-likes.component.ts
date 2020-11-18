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
        tap(t => console.log("My articles:", t))
      )
      .subscribe(
        result => {
          if (result.length == 0) {
            this.likedArticles = null;
          } else {
            this.likedArticles = result;
            for (let o of this.likedArticles) {
              this.likedArticleIDs.push(o.articleID);
            }
          }
        });

    this._articleService.getArticles(0)
      .pipe(
        map(articles => articles.filter(article => article.articleID in this.likedArticleIDs)), // Only get the articles that the user has liked
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
        });

    console.log("Articles I like:", this.articles);

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
        console.log(result);
        this.openSnackBar("The article is disliked", "Undo", like);
      }
    );

  }

  // Snackbar
  openSnackBar(message, action, like: Like) {
    console.log("Like in snack", like);
    let snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dimissed");
    });

    snackBarRef.onAction().subscribe(() => {

      if (action != "Dismiss") {

        console.log("The snackbar action was triggerd");

        this._likeService.addLike(new Like(0, like.userID, like.articleID)).subscribe(
          () => {
            this.snackBar.open("Action is undone", 'Dismiss', { duration: 3000 });
          }
        );

      }
    });

  }

}
