import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SaveVisitService {


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  private url = "http://localhost:3000/shops/visit";


  send_users_visit(userid: Pick<User,"id">,
    poiId:string,n_visitors: number) : Observable<any>
   {

       return this.http
       .post(`${this.url}`, { userid, poiId,n_visitors }, this.httpOptions)
       .pipe(
         first(),
         catchError(this.errorHandlerService.handle_sendcoords_error<string>(" ")),
       );
    }


}
