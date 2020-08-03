import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = environment.LOCAL;
  header = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

 
  getToken() {
    return localStorage.getItem('token');
  }
  
  getUserId() {
    return localStorage.getItem('user-id');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    let user_id = localStorage.removeItem('user-id');
    if (removeToken == null && user_id == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, {
      headers: this.header
    }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getUserBytoken(): Observable<any> {
    let user_id = this.getUserId();
    let api = `${this.endpoint}/users/${user_id}`;
    return this.http.get(api, {
      headers: this.header
    })
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
