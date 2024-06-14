import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from './types';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private basePath = 'https://railway-planner-backend-production.up.railway.app'

    constructor(
        private auth: AuthService,
        private http: HttpClient,
        private router: Router
    ) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token')
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        }
        if (token) headers['Authorization'] = `Bearer ${token}`
        return new HttpHeaders(headers)
    }

    private getUrl(relativePath: string) {
        return `${this.basePath}${relativePath}`
    }

    get<T>(
        relativePath: string,
        params?: HttpParams
    ): Observable<T> {
        console.log("Get to ", relativePath, 'header:', this.getHeaders())
        return this.http.get<T>(this.getUrl(relativePath), {
            headers: this.getHeaders(),
            context: undefined,
            observe: 'body',
            params,
            reportProgress: undefined,
            responseType: 'json',
            withCredentials: undefined,
        }).pipe(
            tap({
                error: (error: HttpErrorResponse) => {
                    console.log('Error at get request', error)
                    if (error.status === 403) {
                        this.router.navigate(['/login']).then()
                    }
                    if (error.status === 401) {
                        this.router.navigate(['/login']).then()
                    }
                }
            })
        )
    }

    delete<T>(
        relativePath: string,
        params?: HttpParams
    ): Observable<T> {
        return this.http.get<T>(this.getUrl(relativePath), {
            headers: this.getHeaders(),
            context: undefined,
            observe: 'body',
            params,
            reportProgress: undefined,
            responseType: 'json',
            withCredentials: undefined,
        })
    }

    post<T>(
        relativePath: string,
        body: any,
        params?: HttpParams
    ): Observable<T> {
        return this.http.post<T>(this.getUrl(relativePath), body,{
            headers: this.getHeaders(),
            context: undefined,
            observe: 'body',
            params,
            reportProgress: undefined,
            responseType: 'json',
            withCredentials: undefined,
        })
    }
}
