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

// Guards
import { AuthGuard } from './security/guards/auth.guard';
import { JournalistGuard } from './security/guards/journalist.guard';

import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { MyArticlesComponent } from './articles/my-articles/my-articles.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';

// Admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ToReviewComponent } from './admin/to-review/to-review.component';
import { JournalistOverviewComponent } from './admin/journalists/journalist-overview/journalist-overview.component';
import { JournalistFormComponent } from './admin/journalists/journalist-form/journalist-form.component'



const routes: Routes = [
  { path: '', component: ArticlesComponent },
  // { path: 'contact', component: ContactComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticleDetailComponent},
  { path: 'help', component: HelpComponent },
  { path: 'login', component: SecurityComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'new-article', component: CreateArticleComponent, canActivate: [JournalistGuard] }, // Only for journalists and admins !!!
  { path: 'my-articles', component: MyArticlesComponent, canActivate: [JournalistGuard] }, // Only for journalists and admins !!!
  { path: 'update-article', component: UpdateArticleComponent, canActivate: [JournalistGuard] }, // Only for journalists and admins !!!
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Only for admins !!!
  { path: 'to-review', component: ToReviewComponent, canActivate: [AuthGuard] }, // Only for admins !!!
  { path: 'journalists', component: JournalistOverviewComponent, canActivate: [AuthGuard] }, // Only for admins !!!
  { path: 'journalist-form', component: JournalistFormComponent, canActivate: [AuthGuard] }, // Only for admins !!!




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
