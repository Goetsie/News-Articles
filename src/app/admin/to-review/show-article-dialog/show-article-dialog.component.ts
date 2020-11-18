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

  alineas_shortSummary: String[];
  alineas_body: String[];
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.article = this.data.article;
    // Article body and the short summary needs to be splitted by the new line characters, otherwise one (long) text.
    this.alineas_shortSummary = this.article.shortSummary.split(/\r?\n/);
    this.alineas_body = this.article.body.split(/\r?\n/);
  }

  ngOnInit(): void {
  }

}
