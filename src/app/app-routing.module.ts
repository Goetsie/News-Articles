import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { from } from 'rxjs';

import {ArticlesComponent } from './articles/articles/articles.component';

// Dummy component
import { ContactComponent } from './contact/contact.component';
import { HelpComponent} from './help/help.component';

import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { SecurityComponent } from './security/security/security.component';

import { SignupComponent } from './security/signup/signup.component';

import { AuthGuard } from './security/guards/auth.guard';

import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { MyArticlesComponent } from './articles/my-articles/my-articles.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';


const routes: Routes = [
  { path: '', component: ArticlesComponent },
  // { path: 'contact', component: ContactComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticleDetailComponent},
  { path: 'help', component: HelpComponent },
  { path: 'login', component: SecurityComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'new-article', component: CreateArticleComponent, canActivate: [AuthGuard] }, // Only for journalists and admins !!!
  { path: 'my-articles', component: MyArticlesComponent, canActivate: [AuthGuard] }, // Only for journalists and admins !!!
  { path: 'update-article', component: UpdateArticleComponent, canActivate: [AuthGuard] }, // Only for journalists and admins !!!


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
