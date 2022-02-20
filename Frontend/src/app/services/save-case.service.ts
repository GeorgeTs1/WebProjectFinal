import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SaveCaseService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  private url = "http://localhost:3000/covid_case";

  mymap: any;
  dialog:any;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


   send_backend_covid_case(user_id:Pick<User,"id">,
     date:any) : Observable<any>
    {
        return this.http
        .post(`${this.url}/postcase`, { user_id , date }, this.httpOptions)
        .pipe(
          first(),
          catchError(this.errorHandlerService.handle_saveCovid_error<string>(" ")),
        );
     }



}
