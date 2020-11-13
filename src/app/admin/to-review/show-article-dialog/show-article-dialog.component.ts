import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/articles/models/article.model';

@Component({
  selector: 'app-show-article-dialog',
  templateUrl: './show-article-dialog.component.html',
  styleUrls: ['./show-article-dialog.component.scss']
})
export class ShowArticleDialogComponent implements OnInit {

article: Article;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.article = this.data.article;
  }

  ngOnInit(): void {
  }

}
