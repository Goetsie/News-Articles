import { Injectable } from '@angular/core';
import { Article } from './models/article.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _article: string;
  public articleList: Array<Article> = [];

  constructor(private http: HttpClient) { }

  // GET --> get all articles
  getArticles(tagID): Observable<Article[]> {
    return this.http.get<Article[]>("https://localhost:44348/api/Article");
  }

  // GET --> get one article by the id
  getArticle(id): Observable<Article> {
    return this.http.get<Article>("https://localhost:44348/api/Article/" + id);
  }

  findArticles(tagID): Observable<Article[]> {
    console.log("Filter");
    console.log(this.http.get<Article[]>("https://localhost:44348/api/Article/" + tagID));
    return this.http.get<Article[]>("https://localhost:44348/api/Article/" + tagID);

  }

}
