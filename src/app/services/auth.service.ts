import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public get currentUserVal(): any {
    return this._currentUserSubject.value;
  }

  constructor(private http: HttpClient, private router: Router) {
    this._currentUserSubject = new BehaviorSubject<User>(
      this.getUserFromLocalStorage()
    );
    this.currentUser = this._currentUserSubject.asObservable();
  }

  login(username: string, password: string): boolean {
    const user = environment.user;
    if (user.username === username && user.password === password) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ username, password })
      );
      this._currentUserSubject.next({ username, password });
      return true;
    }
    return false;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('page');
    this.router.navigate(['/home']);
    this._currentUserSubject.next(null);
  }

  private getUserFromLocalStorage(): User {
    try {
      return JSON.parse(localStorage.getItem('currentUser')!);
    } catch (error) {
      return null!;
    }
  }
}
