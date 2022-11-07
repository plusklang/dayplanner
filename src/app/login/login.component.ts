import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = this.formBuilder.group({
        username: '',
        password: ''
    });

    status: { isError: boolean, message: string } = {
        message: '',
        isError: false
    }

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    async onLogin() {
        this.auth.login(
            this.loginForm.value.username || '',
            this.loginForm.value.password || '').subscribe({
            next: () => {
                this.router.navigate(['']).then()

            },
            error: (error: any) => {
                const statusCode = error.status
                console.log('statuscode', statusCode)
                  if (statusCode === 401) {
                      this.status.message = 'Wrong username or password'
                      this.status.isError = true
                      return
                  }
                  this.status.isError = true
                  this.status.message = 'An error occurred. Please try again'
            }
        })
    }


}
