import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  public articleID;
  public article: Article;

  constructor(private _articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));

    this._articleService.getArticle(id)
      .pipe(
        tap(t => console.log("Get Article:", t))
      )
      .subscribe(
        result => {
          this.article = result;
        });
  }

}
