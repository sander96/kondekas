import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  private _isAuthenticated: boolean = false;
  private _isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<any> {
    return this.http.post<string>('/api/login/email',
        {email: email, password: password},
        {headers: new HttpHeaders({'Content-Type': 'application/json'})})
        .pipe(catchError(this.handleError));
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
  };

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }


  get isAdmin(): boolean {
    return this._isAdmin;
  }
}