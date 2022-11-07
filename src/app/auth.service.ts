import { Injectable } from '@angular/core';
import { User, LoginResponse } from './types';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken!: string
  private _user!: User
  constructor(
      private http: HttpClient,
  ) {}

  get user(): User {
    return this._user
  }

  set user(user: User) {
    this._user = user
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
            localStorage.setItem('token', this.accessToken)
            this._user = {
              name: response.name,
              username: response.username
            }
            console.log("saved user", this._user)
          },
          error: (error: any) => {
            console.log('Login Error', error)
          }
        })
    )
  }
}
