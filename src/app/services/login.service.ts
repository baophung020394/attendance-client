import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string = environment.LOCAL;

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  login (user) {
    return this.http.post<any>(`${this.endpoint}/users/login`, user )
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        map( user => {
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        })
      );
  }

}
