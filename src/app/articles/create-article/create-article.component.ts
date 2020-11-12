import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  article: Article = new Article(0, '', '', '', '', null, parseInt(localStorage.getItem("userID")), 2); // 2--> to review 1-->safe
  tags: Tag[];
  
  constructor(private _tagService: TagService, private _articleService: ArticleService) {
    this._tagService.getTags()
    .pipe(
      // map(res => {
      //   return res.slice(0,2); // Only show the first two members
      // }),
      tap(t => console.log(t))
    )
    .subscribe(
    result => {
      this.tags = result;
    });
   }

  ngOnInit(): void {
  }


  onSubmit(){
    console.log("User wants to submit a new article", this.article);
    this._articleService.addArticle(this.article).subscribe();
  }

}
