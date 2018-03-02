import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {LoginModel} from "../models/login.model";
import {catchError} from "rxjs/operators";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  private _isAuthenticated: boolean = false;
  private _isAdmin: boolean = false;

  constructor(private http: HttpClient) {
    this.http.get<{loggedIn: boolean}>('/api/auth/logged-in')
        .subscribe(response => {
          if (response.loggedIn) {
            this._isAuthenticated = true;
          }
        })
  }

  authenticate(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginModel>('/api/login/email',
        {email: email, password: password},
        {headers: new HttpHeaders({'Content-Type': 'application/json'})})
        .pipe(catchError(this.handleError))
        .map(response => {
          if (response.status == 'success') {
            this._isAuthenticated = true;
            return true;
          }
          return false;
        });
  }

  logOut(): Observable<boolean> {
    return this.http.get<LoginModel>('/api/logout')
        .pipe(catchError(this.handleError))
        .map(response => {
          if (response.status == 'success') {
            this._isAuthenticated = false;
            this._isAdmin = false;
            return true;
          }
          return false;
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
  };

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }


  get isAdmin(): boolean {
    return this._isAdmin;
  }
}