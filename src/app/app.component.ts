import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Task, User } from './types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading = false

  constructor(
      private auth: AuthService,
      private api: ApiService,
      private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  async ngOnInit() {
    console.log('ngOnInit')
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('no token found!!!')
      this.router.navigate(['/login']).then()
    }
    if (this.auth.user) return
    this.loading = true
    this.api.get<{user: User}>('/config').subscribe({
      next: (res) => {
        this.auth.user = res.user
        this.loading = false
        this.router.navigate([''])
        console.log('loaded user', res.user)
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 403) {
          this.router.navigate(['/login']).then()
          return
        }
        console.log('Error loading config')
        console.log(error)
      }
    })
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/