import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { map, tap } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  articleID: number = null; 
  public article: Article;

  alineas: String[];

  loggedIn = this._authenticateService.isLoggedIn();

  constructor(private _articleService: ArticleService, private route: ActivatedRoute, private _authenticateService: AuthenticateService) {
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
          // Article body needs to we splitted by the new line characters, otherwise one (long) text.
          this.alineas = this.article.body.split(/\r?\n/);
        });
  }

}
