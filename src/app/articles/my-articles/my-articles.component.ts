import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit {

  articles: Article[];

  dataSource;
  // columnsToDisplay = ['Title', 'Subtitle', 'Status'];
  // expandedElement: PeriodicElement | null;

  displayedColumns: string[] = ['title', 'subTitle', 'articleStatusID'];

  constructor(private _articleService: ArticleService) { 
    this._articleService.getArticles(0)
    .pipe(
      tap(t => console.log("Get Articles:", t))
    )
    .subscribe(
    result => {
      this.articles = result;
      this.dataSource = this.articles;
    });

  }
  ngOnInit(): void {
  }

}
