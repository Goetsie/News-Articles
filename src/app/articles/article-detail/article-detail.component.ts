import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { LikeService } from '../services/like.service';
import { map, tap } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Like } from '../models/like.model';
import { LayoutGapDirective } from '@angular/flex-layout';



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  articleID: number = null;
  public article: Article;

  userID = parseInt(localStorage.getItem("userID"));

  ifImage = false;
  likedThisArticle: boolean = false;

  likes: Like[];

  alineas: String[];

  loggedIn = this._authenticateService.isLoggedIn();

  constructor(private _articleService: ArticleService, private route: ActivatedRoute, private _authenticateService: AuthenticateService, private _likeService: LikeService) {
    this.articleID = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("ArticleID in detail constructor:", this.articleID);

  }

  ngOnInit() {
    // this.articleID = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("ArticleID in detail:", this.articleID);

    this._articleService.getArticle(this.articleID)
      .pipe(
        tap(t => console.log("Get Article:", t))
      )
      .subscribe(
        result => {
          this.article = result;
          if (result.imgPath != null) {
            this.ifImage = true;
          }

          // Article body needs to we splitted by the new line characters, otherwise one (long) text.
          this.alineas = this.article.body.split(/\r?\n/);
        });

    this._likeService.getLikes()
      .pipe(
        map(likes => likes.filter(like => like.articleID == this.article.articleID)), // Get all the likes of the article
        tap(t => console.log("Likes on article:", t))
      )
      .subscribe(
        result => {
          if (result.length == 0) {
            this.likes = null;
          } else {
            this.likes = result;
            for (let like of this.likes) {
              if(like.userID == this.userID){
                this.likedThisArticle = true;
                console.log("You liked this article");
              }
            }
          }
        });

  }

  like(articleID: number) {
    console.log("User likes this article");
    let like = new Like(0, parseInt(localStorage.getItem('userID')), articleID);
    console.log("Like:", like);
    this._likeService.addLike(like).subscribe(
      result => {
        // Handle result
        console.log("Add like:", result)
        this.likedThisArticle = true;
      }
    );
  }

}
