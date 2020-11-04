import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleService } from './article.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { ReactionComponent } from './reaction/reaction.component';
import { AddReactionComponent } from './reaction/add-reaction/add-reaction.component';


@NgModule({
  declarations: [ArticlesComponent, ArticleDetailComponent, FilterComponent, FilterPipe, ReactionComponent, AddReactionComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    ArticleService
  ]
})
export class ArticlesModule { }
