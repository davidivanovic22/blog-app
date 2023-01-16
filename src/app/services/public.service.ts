import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, expand, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArticleResponse } from '../models/article';
import { BlogPagination } from '../models/blog';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private baseHref = environment.baseHref;
  private readonly _categories = new BehaviorSubject<BlogPagination | null>(
    null
  );
  onCategoriesLoaded = this._categories.asObservable();


  private readonly _articles = new BehaviorSubject<BlogPagination | null>(
    null
  );
  onArticlesLoaded = this._articles.asObservable();

  constructor(private http: HttpClient) {}

  get(api: string) {
    return this.http.get(api)
  }

  getAllArticles(page?: string): Observable<BlogPagination> {
    let params = new HttpParams();
    params = page ? params.append('page', page) : params;
    return this.http.get<BlogPagination>(`${this.baseHref}/articles`, {
      params: params,
    });
  }


  getAllArticlesComments(id: number): Observable<BlogPagination> {
    return this.http.get<BlogPagination>(`${this.baseHref}/articles/${id}/comments`);
  }

  getArticleById(articleId?: number): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(
      `${this.baseHref}/articles/${articleId}`
    );
  }

  getAllCategories(page?: string): Observable<BlogPagination> {
    let params = new HttpParams();
    params = page ? params.append('page', page) : params;
    return this.http.get<BlogPagination>(`${this.baseHref}/categories`, {
      params: params,
    });
  }

  getAllCategoriesFromPagination(): Observable<BlogPagination> {
    return this.getAllCategories()
    .pipe(
      expand(
        (response): Observable<any> =>
          response.next_page_url
            ? this.get(response.next_page_url)
            : EMPTY
      )
    )
  }

  onCategoriesChange(categories: BlogPagination): void {
    this._categories.next(categories);
  }

  onArticlesChange(articles: BlogPagination): void {
    this._articles.next(articles);
  }
}
