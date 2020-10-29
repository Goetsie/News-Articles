import { Injectable } from '@angular/core';
import { Article } from './models/article.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _article : string;
  public articleList: Array<Article> = [];

  constructor(private http: HttpClient) { }

  // GET --> get all articles
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("https://localhost:44348/api/Article");
      // return this.http.get<Article[]>("https://localhost:44348/api/Article", {
      //     headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      // });
      // return this.http.get<Article[]>("https://localhost:44348/api/Article");
  }

  // GET --> get one article by the id
  getArticle(id): Observable<Article> {
    return this.http.get<Article>("https://localhost:44348/api/Article/" + id);
  }

}
