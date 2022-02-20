
import { Injectable } from "@angular/core";

import { Observable, of, startWith } from "rxjs";



@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {

  handle_log_error<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_sign_error<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
       return of(result as T);
  };
  }




  handle_sendcoords_error<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T|string> => {
       return of(result as T).pipe(startWith("Error in sending backend coordinates"));
  };
  }

  handle_getshops_error<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T|string> => {
       return of(result as T).pipe(startWith("Error in getting shops data"));
  };
  }

  handle_savevisits_error<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T|string> => {
       return of(result as T).pipe(startWith("Error in storing users visit"));
  };
  }

  handle_saveCovid_error<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(2));
  };
  }


  handle_searchShop_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }



  handle_check_pass_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }



  handle_pass_req_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_save_password_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_shops_history_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_covid_registers_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_CDN_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_delete_pois_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }


  handle_week_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_week_covid_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };

  }


  handle_month_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };
  }

  handle_month_covid_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };

  }

  handle_getAllPois_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|number> => {
       return of(result as T).pipe(startWith(1));
  };

  }

  handle_delete_mypos_error<T>(operation = "operation", result?: T) {

    return (error: any): Observable<T|string> => {
       return of(result as T).pipe(startWith("Failed in delete Users Position"));
  };

  }






}
