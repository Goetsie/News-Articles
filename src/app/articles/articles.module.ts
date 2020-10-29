import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleService } from './article.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [ArticlesComponent, ArticleDetailComponent, FilterComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    ArticleService
  ],
})
export class ArticlesModule { }
