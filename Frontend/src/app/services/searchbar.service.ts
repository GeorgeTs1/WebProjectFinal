import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { Shops } from '../models/Shops';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  private url = "http://localhost:3000/search";
  private url2 = "http://localhost:3000/shops";


  constructor(private http: HttpClient,private errorHandlerServivce: ErrorHandlerService) { }

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  search(location: string) // Searching for POIS given in search bar
  : Observable<any>
  {

      return this.http.
      post(`${this.url}/searchPOI`, {value:location},this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerServivce.handle_searchShop_error<any>(''))
      );
  }

  getAllPois() : Observable<any>
  {

    return this.http
     .get(`${this.url2}/getAllPois`,this.httpOptions)
     .pipe(
       first(),
       catchError(this.errorHandlerServivce.handle_getAllPois_error<any>(''))
     )

  }


}
