import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import { map, tap } from 'rxjs/operators';
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
//   @Input() stringFilter: string;
// // stringFilter = "5";
  articles : Article[];
  public searchString = "";
  public tagFilter = "";

  // @ViewChild(MatPaginator) paginator : MatPaginator;
  // obs: Observable<Article[]>;
  // dataSource: MatTableDataSource<Article>;



  constructor(private _articleService: ArticleService, private router: Router) { 
    this._articleService.getArticles(0)
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

  // Show only the articles with this id:
  showTags(tagID){
    console.log("Show articles with tagID:", tagID);
    this.tagFilter = tagID;
  }

  ngOnInit(): void {

  }

}
