import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs/operators';
import { ArticleService } from 'src/app/articles/article.service';
import { Article } from 'src/app/articles/models/article.model';

@Component({
  selector: 'app-to-review',
  templateUrl: './to-review.component.html',
  styleUrls: ['./to-review.component.scss']
})
export class ToReviewComponent implements OnInit {

  articles: Article[];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'subTitle', 'user.name', 'actions'];

  constructor(private _articleService: ArticleService) { 
    this._articleService.getArticles(0)
    .pipe(
      map(articles => articles.filter(article => article.articleStatusID == 2)), // Only get the article who needs a review
      tap(t => console.log("My articles:", t))
    )
    .subscribe(
    result => {
      if (result.length == 0){
        this.articles = null;
      }else{
        this.articles = result;
      }
      
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    console.log("My articles:", this.articles);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit(): void {
  }

}
