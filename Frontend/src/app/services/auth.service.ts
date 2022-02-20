import { NavigationComponent } from './../components/navigation/navigation.component';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject, bindCallback, of } from "rxjs";
import { first, catchError, tap, map } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;
  userEmail: Pick<User,"email">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {}



  signup(user: Omit<User, "id">): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handle_sign_error<User>("signup"))
      );
    }

  login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<number|{
    token: string;
    userId: Pick<User, "id">;
    admin : Number;
    }>
    {
        return this.http
        .post(`${this.url}/login`, { email, password }, this.httpOptions)
        .pipe(
          first(Object),
          tap((tokenObject: { token: string; userId: Pick<User, "id">;
              userEmail: Pick<User,"email">; admin:Number}) => {
            this.userId = tokenObject.userId;
            this.userEmail = tokenObject.userEmail;
            localStorage.setItem("token", tokenObject.token);


            if(tokenObject.admin==0)
            {
              this.isUserLoggedIn$.next(true);
              this.router.navigate(["map"]);
            }
            else
            {
              this.isAdminLoggedIn$.next(true);
              this.router.navigate(['admin']);
            }
          }),
          catchError(
            this.errorHandlerService.handle_log_error<{
            token: string;
            userId: Pick<User, "id">;
            userEmail: Pick<User,"email">;
            admin : Number;
            }>("login")
          )
        )
    }



    logout(email : Pick<User,"email">): Observable<any>
    {
      return this.http
      .post(`${this.url}/logout`,{email},this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handle_delete_mypos_error(" "))
      )
    }


}
