import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

// Guests
import { ArticlesComponent } from './articles/articles/articles.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { SecurityComponent } from './security/security/security.component';
import { SignupComponent } from './security/signup/signup.component';

// Users
import { MyLikesComponent } from './user/my-likes/my-likes.component';
import { MyReactionsComponent } from './user/my-reactions/my-reactions.component';
import { ProfileComponent } from './user/profile/profile.component';

// Guards
import { AuthGuard } from './security/guards/auth.guard';
import { JournalistGuard } from './security/guards/journalist.guard';
import { AdminGuard } from './security/guards/admin.guard';

// Journalist
import { CreateArticleComponent } from './articles/create-article/create-article.component';
import { MyArticlesComponent } from './articles/my-articles/my-articles.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';

// Admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ToReviewComponent } from './admin/to-review/to-review.component';
import { JournalistOverviewComponent } from './admin/journalists/journalist-overview/journalist-overview.component';
import { JournalistFormComponent } from './admin/journalists/journalist-form/journalist-form.component';
import { TagsComponent } from './admin/tags/tags.component';

import { WildcardRouteComponent } from './wildcard-route/wildcard-route.component';

const routes: Routes = [

  // Guest access
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: 'login', component: SecurityComponent },
  { path: 'signup', component: SignupComponent },

  // User access
  { path: 'my-likes', component: MyLikesComponent, canActivate: [AuthGuard] },
  { path: 'my-reactions', component: MyReactionsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // Journalist access (& admin)
  { path: 'new-article', component: CreateArticleComponent, canActivate: [JournalistGuard] },
  { path: 'my-articles', component: MyArticlesComponent, canActivate: [JournalistGuard] },
  { path: 'update-article', component: UpdateArticleComponent, canActivate: [JournalistGuard] },

  // Admin access
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'to-review', component: ToReviewComponent, canActivate: [AdminGuard] },
  { path: 'journalists', component: JournalistOverviewComponent, canActivate: [AdminGuard] },
  { path: 'journalist-form', component: JournalistFormComponent, canActivate: [AdminGuard] },
  { path: 'tags', component: TagsComponent, canActivate: [AdminGuard] },

  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
