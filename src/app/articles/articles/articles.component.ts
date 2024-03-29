import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import { filter, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {

  articles : Article[];
  public searchString = "";
  public tagFilter = "";

  constructor(private _articleService: ArticleService, private router: Router) { 
    this._articleService.getArticles()
    .pipe(
      map(articles => articles.filter(article => article.articleStatusID === 1)), // Only get the aricles ready for publication
      tap(t => console.log("Get Articles tap:", t))
    )
    .subscribe(
    result => {
      this.articles = result;
    });

  }

  // Show the full news article
  showArticle(a: Article){
    console.log("Show article with ID:", a.articleID);
    console.log("Article:", a);
    this.router.navigate(['/articles', a.articleID]);
  }

  // Show only the articles with this tag:
  showTags(tagID){
    console.log("Show articles with tagID:", tagID);
    this.tagFilter = tagID;
  }

  ngOnInit(): void {

  }

}
