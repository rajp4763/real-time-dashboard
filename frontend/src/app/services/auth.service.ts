import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  access_token: string; // JWT token
}

@Injectable({
  providedIn: 'root', // Provide globally for standalone components
})
export class AuthService {
  private baseUrl = 'http://localhost:8000'; // Replace with your server URL
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public redirectUrl = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access_token);
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    console.log('removed token');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
