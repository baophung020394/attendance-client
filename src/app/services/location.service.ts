import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface Location {
  latitude: string;
  longitude: string;
  country_name: string;
  country_flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  getIpAddress() {
    return this.http
      .get<Location>('https://api.ipify.org/?format=json')
      .pipe(
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line: typedef
  getGEOLocation(ip) {

    // let headers = new HttpHeaders();
    const url = 'https://api.ipgeolocation.io/ipgeo?apiKey=ccb2312eee26444d8fe71014d359efd7&ip=' + ip;
    return this.http
      .get<Location>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line: typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
