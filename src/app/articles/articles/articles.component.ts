import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {

  articles : Article[];

  constructor(private _articleService: ArticleService, private router: Router) { 
    this._articleService.getArticles()
    .pipe(
      tap(t => console.log("Get Articles:", t))
    )
    .subscribe(
    result => {
      this.articles = result;
    });
  }

  // Show the full news article
  showArticle(a: Article){
    console.log("Show article with ID:", a.articleID);
    this.router.navigate(['/articles', a.articleID]);
  }

  ngOnInit(): void {
  }

}
