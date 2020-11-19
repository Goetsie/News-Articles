import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ArticleService } from 'src/app/articles/article.service';
import { Article } from 'src/app/articles/models/article.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  numberArticlesToReview: number;
  QOD: any;

  constructor(private _articleService: ArticleService) { }


  ngOnInit(): void {
    this._articleService.getArticles()
    .pipe(
      map(articles => articles.filter(article => article.articleStatusID == 2)), // Only get the article who needs a review
      tap(t => console.log("Articles to review:", t))
    )
    .subscribe(
      result => {
        if (result.length == 0) {
          this.numberArticlesToReview = 0;
        } else {
          this.numberArticlesToReview = result.length;
        }
      });
  }

}
