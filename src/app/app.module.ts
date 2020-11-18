import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Implements all angular material imports needed
import { SharedModule } from './shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ArticlesModule } from './articles/articles.module';
import { ArticleService } from './articles/article.service';
import { HelpComponent } from './help/help.component';

// HTTP
import { HttpClientModule } from '@angular/common/http';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

// Security / login
import { SecurityModule } from './security/security.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ToReviewComponent } from './admin/to-review/to-review.component';
import { ShowArticleDialogComponent } from './admin/to-review/show-article-dialog/show-article-dialog.component';
import { JournalistOverviewComponent } from './admin/journalists/journalist-overview/journalist-overview.component';
import { JournalistFormComponent } from './admin/journalists/journalist-form/journalist-form.component';
import { ConfirmDialogComponent } from './admin/journalists/journalist-overview/confirm-dialog/confirm-dialog.component';
import { MyLikesComponent } from './user/my-likes/my-likes.component';
import { MyReactionsComponent } from './user/my-reactions/my-reactions.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    NavbarComponent,
    SidenavComponent,
    DashboardComponent,
    ToReviewComponent,
    ShowArticleDialogComponent,
    JournalistOverviewComponent,
    JournalistFormComponent,
    ConfirmDialogComponent,
    MyLikesComponent,
    MyReactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ArticlesModule,
    FlexLayoutModule,
    SecurityModule,
  ],
  providers: [ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
