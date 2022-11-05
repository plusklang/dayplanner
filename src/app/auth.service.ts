import { Injectable } from '@angular/core';
import { User, LoginResponse } from './types';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn!: boolean
  private accessToken!: string
  private _user!: User
  constructor(
      private http: HttpClient,
  ) { }

  isLoggedIn(): boolean {
    return this.loggedIn
  }

  setLoggedIn(user: User): void {
    this.loggedIn = true
    this._user = user
  }

  get user(): User {
    return this._user
  }

  login(username: string, password: string): Observable<any> {
    console.log('authService login');
    return this.http.post
    ('https://railway-planner-backend-production.up.railway.app/login',{
      username,
      password,
    }).pipe(
        tap({
          next: (res) => {
            console.log('login res inside tap', res)
            const response = res as LoginResponse
            this.accessToken = response.accessToken
            this._user = {
              name: response.name,
              username: response.username
            }
            localStorage.setItem('token', this.accessToken)
            console.log("saved user", this._user)
          },
          error: (error: any) => {
            console.log('Login Error', error)
          }
        })
    )
  }
}
