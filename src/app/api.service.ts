import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private basePath = 'https://railway-planner-backend-production.up.railway.app'

    constructor(
        private auth: AuthService,
        private http: HttpClient
    ) {}

    private static getHeaders(): HttpHeaders {

        const token = localStorage.getItem('token')
        console.log('token from storage:', token)
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
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
        })
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
