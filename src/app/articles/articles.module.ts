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
import { UpdateReactionComponent } from './reaction/update-reaction/update-reaction.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { DialogComponent } from './create-article/dialog/dialog.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { UploadFileComponent } from './upload-file/upload-file.component';


@NgModule({
  declarations: [ArticlesComponent, ArticleDetailComponent, FilterComponent, FilterPipe, ReactionComponent, AddReactionComponent, UpdateReactionComponent, CreateArticleComponent, MyArticlesComponent, DialogComponent, UpdateArticleComponent, UploadFileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    ArticleService
  ],
  entryComponents:[
    DialogComponent
  ]
})
export class ArticlesModule { }
