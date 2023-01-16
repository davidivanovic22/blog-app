import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article } from '../models/article';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseHref = environment.baseHref;

  constructor(private http: HttpClient) {}

  addPost(article: Article): Observable<Article> {
    let params = new HttpParams();
    params = params.append(
      'api_token',
      '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN'
    );
    return this.http.post<Article>(this.baseHref + '/articles', article, {
      params: params,
    });
  }

  editPost(article: Article): Observable<Article> {
    let params = new HttpParams();
    params = params.append(
      'api_token',
      '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN'
    );
    return this.http.put<Article>(
      this.baseHref + `/articles/${article.id}`,
      article,
      {
        params: params,
      }
    );
  }

  deletePost(id: number): Observable<void> {
    let params = new HttpParams();
    params = params.append(
      'api_token',
      '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN'
    );
    return this.http.delete<void>(this.baseHref + `/articles/${id}`, {
      params: params,
    });
  }
  addCategory(category: Category): Observable<Category> {
    let params = new HttpParams();
    params = params.append(
      'api_token',
      '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN'
    );
    return this.http.post<Category>(this.baseHref + '/categories', category, {
      params: params,
    });
  }

  editCategory(category: Category): Observable<Category> {
    let params = new HttpParams();
    params = params.append(
      'api_token',
      '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN'
    );
    return this.http.put<Category>(
      this.baseHref + `/categories/${category.id}`,
      category,
      {
        params: params,
      }
    );
  }

  deleteCategory(id: number): Observable<void> {
    let params = new HttpParams();
    params = params.append(
      'api_token',
      '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN'
    );
    return this.http.delete<void>(this.baseHref + `/categories/${id}`, {
      params: params,
    });
  }
}
