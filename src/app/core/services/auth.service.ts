import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthData, IUser } from '../models';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const BACKEND_URL = environment.apiUrl + 'users/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getIsAuth(): boolean {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  getUserId(): string {
    let token = localStorage.getItem('token');
    if (!token) return '';
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token)?.userId;
  }

  createUser(value: IUser) {
    return this.http
      .post<{ accessToken: string }>(BACKEND_URL + 'signup', value)
      .pipe(
        map((response) => {
          const token = response.accessToken;
          if (token) {
            localStorage.setItem('token', token);
            // const helper = new JwtHelperService();
            // const decodedToken = helper.decodeToken(token);
            // this.setAuthTimer(decodedToken?.exp);
            this.router.navigate(['/']);
          }
        }),
        catchError(this.errorHandler)
      );
  }

  login(value: IAuthData) {
    return this.http
      .post<{ accessToken: string }>(BACKEND_URL + 'signin', value)
      .pipe(
        map((response) => {
          const token = response.accessToken;
          if (token) {
            localStorage.setItem('token', token);
            // const helper = new JwtHelperService();
            // const decodedToken = helper.decodeToken(token);
            // this.setAuthTimer(decodedToken?.exp);
            this.router.navigate(['/']);
          }
        }),
        catchError(this.errorHandler)
      );
  }

  autoAuthUser() {
    // const authInformation = this.getAuthData();
    // if (!authInformation) {
    //   return;
    // }
    // const now = new Date();
    // const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // if (expiresIn > 0) {
    //   this.token = authInformation.token;
    //   this.isAuthenticated = true;
    //   this.userId = authInformation.userId;
    //   this.setAuthTimer(expiresIn / 1000);
    //   this.authStatusListener.next(true);
    // }
  }

  logout() {
    clearTimeout(this.tokenTimer);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
