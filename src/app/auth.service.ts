import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn!: boolean
  private username!: string
  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn
  }

  setLoggedIn(username: string): void {
    this.loggedIn = true
    this.username = username
  }

  get userName(): string {
    return this.username
  }
}
