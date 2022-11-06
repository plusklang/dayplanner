import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Task, User } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
      private auth: AuthService,
      private api: ApiService,
      private router: Router
  ) {}

  async ngOnInit() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['/login']).then()
    }
    if (this.auth.user) return
    this.api.get<{user: User}>('/config').subscribe({
      next: (res) => {
        this.auth.user = res.user
        this.router.navigate(['/board'])
        console.log('loaded user', res.user)
      }
    })
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/