import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { Stats } from "../models/stats.model";

@Injectable()
export class StatisticsService {

  os: string;
  browser: string;

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<Stats[]> {
    return this.http.get<Stats[]>('/api/stats')
      .map(response =>  {
        return response;
      })
  }

  sendStatistics(os: string, browser: string): Observable<boolean> {
    return this.http.post<Stats>('/api/stats', {os: os, browser: browser},
        {headers: new HttpHeaders({'Content-Type': 'application/json'})})
        .pipe(catchError(this.handleError))
        .map(response => {
          return true;
        });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 200) {
      return Observable.of({status: 'success'});
    }

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
    // return an ErrorObservable with a user-facing error message
    return Observable.of({status: 'failure'});
  }
}