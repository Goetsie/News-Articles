import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'subTitle', 'articleStatusID'];

  constructor(private _articleService: ArticleService) { 
    this._articleService.getArticles(0)
    .pipe(
      tap(t => console.log("Get Articles:", t))
    )
    .subscribe(
    result => {
      this.articles = result;
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
    });

  }
  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

}
