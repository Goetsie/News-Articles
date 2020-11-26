import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit {

  articles: Article[];
  userRole = null;

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'subTitle', 'articleStatusID', 'actions'];

  constructor(private _articleService: ArticleService, private router: Router) {
    this._articleService.getArticles()
      .pipe(
        map(articles => articles.filter(article => article.userID == parseInt(localStorage.getItem("userID")))), // Only get the of the user that is logged in
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
    this.userRole = localStorage.getItem('userRole');
  }

}



