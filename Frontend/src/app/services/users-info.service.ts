import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, first, Observable } from 'rxjs';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {


  private url = "http://localhost:3000/users_stats";
  private url2 = "http://localhost:3000/reset-password";


  email : Pick<User,"email">;



  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}




  save_new_username(new_name:string,email:Pick<User, "email">) : Observable<any>
 {
  return this.http
  .post(`${this.url}/newUsername`, { new_name,email}, this.httpOptions)
  .pipe(
    first(),
    catchError(this.errorHandlerService.handle_sendcoords_error<string>(" ")),
  );
 }


 send_new_password_req(email:Pick<User,"email">) : Observable<any>
 {
  return this.http
  .post(`${this.url2}/password_req`, { email }, this.httpOptions)
  .pipe(
    first(),
    catchError(this.errorHandlerService. handle_pass_req_error<string>(" ")),
  );
 }



 checkPassword
 (email: Pick<User,"email">, password: Pick<User,"password">)
 {
  return this.http
  .post(`${this.url}/checkPassword`, { email , password }, this.httpOptions)
  .pipe(
    first(),
    catchError(this.errorHandlerService.handle_check_pass_error<string>(" "))

  )}


  save_password(email:Pick<User,"email">,pass:string)
  {
    return this.http
    .post(`${this.url2}/new_password`,{email,pass},this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handle_save_password_error<string>(" "))
    );
  }



  setEmail(email:Pick<User,"email">)
  {
      return this.email = email;
  }








}

