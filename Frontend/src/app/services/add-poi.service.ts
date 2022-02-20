import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, from, lastValueFrom, map, mergeMap, Observable, of } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AddPoiService {



  private delurl = "http://localhost:3000/shops/deletePOI"

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {}

    private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  private httpOptions2: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Authorization" : "authorizationToken}"})
  }






  deletePOI()
  {
      return this.http
      .delete(this.delurl,this.httpOptions2)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handle_delete_pois_error<any>(" ")),
      );
  }






    async sendCDN(url:string): Promise<any> {

      let objectConstructor = ({}).constructor;



    let http1:HttpClient

    let http2: HttpClient

    let msg:string;

    let msg2user:any;

    let error = 0;


    let invalidFormat = 0;

    let api = 'http://localhost:3000/shops/add_poi';

    await fetch(url).then(function (response) { //Wait to download from Server the HTML page

      return response.text(); // Return the page
    }).then(function (html:string) : any { // Take the hrefs from HTML page to download the uploaded files
      let parser = new DOMParser();
	    let doc = parser.parseFromString(html, 'text/html'); // from String(HTML Page) to HTML DOM Element
      let li_table = doc.getElementsByTagName('li'); // get li tag
      let a_table :any  = [];

      for (let i = 0, j = li_table.length; i<j; i++) { // get a tag from html page
                    a_table.push(li_table[i].getElementsByTagName('a'));
            }
      if(a_table.length == 1) //Single File
      {
        let href = a_table[0][0].href;
        href = href.replace('http://localhost:4200','https://ucarecdn.com') // Modification to correct path
        let filepath = href;
        return filepath;
      }
      else // Multiple files
      {
        let hrefs:any = [];
        let filepaths = [];
        a_table.forEach( (element:any) => {
                element = element[0].href.replace('http://localhost:4200','https://ucarecdn.com');  //Modification to correct path
                hrefs.push(element);
        });
        filepaths = hrefs.slice();
        return filepaths;

      }


    })
    .then(async function(filepath:any){ // Download the file from link


      let json:any;
      let jsons:any = []
      let flag:number;


    if(typeof(filepath)=='string') // one JSON file
    {

      await fetch(filepath) // download it
      .then((data:any)=>
      {
        return data.json() // take JSON as input and create Javascript Object

      }).then(res => {

        try { // Validate if its a JSON file
          var obj = JSON.stringify(res);
          let obj2 = JSON.parse(obj);
        }
         catch (e) { //If not JSON file reject and return 1
                  invalidFormat =1;
                  return Promise.reject(invalidFormat); // Reject the JSON parse promise
            }


        json = res;
        return json;

      })
      .catch((err:any)=>{ // if not a JSON file handle it here


        console.log("Error",err);

        error = 1;

        return error;
      })


      if(error==1) // if the JSON parse promise is rejected
      {
        return Promise.reject(error); //reject the download from link promise
      }

      flag=1; // flag = 1 to reject later the upload promise
    }

     else // Many JSON files
    {
        // Asynchronous for each JSON file
        for( const path of filepath){
          await fetch(path)
      .then((data:any)=>
      {

        return data.json() //take JSON as input and create Javascript Object

      }).then(res => {

        console.log(res);

        try { // Check if it is in JSON format
          var obj = JSON.stringify(res);
          let obj2 = JSON.parse(obj);
          }
         catch (e) {
                  invalidFormat =1;
                  return Promise.reject(invalidFormat); // If not JSON Format reject the Many-JSON-Parser promise
            }

        jsons.push(res);
        return jsons;

      })
      .catch((err:any)=>{ // If some of the files are not in JSON Format

        console.log("Error",err);


        error = 1;

        return error;
      })




        }


        if(error==1)
        {
          return Promise.reject(error); // Reject the multiple-download file from links promise
        }

        flag=2; // To stop the upload of multiple files
     }

    switch(flag) // Check for errors in uploading 1 for single 2 for bulk upload of JSON files
    {
      case(1):
          return json;
      case(2):
          return jsons;
       default:
         break;
    }




    })

    .then(async function(data){ // Send the Valid JSON files to Server



      const token = localStorage.getItem("token");

      if(data.constructor === objectConstructor) // Single JSON file indicating by the object constructor and not from an array of Objects
      {
        const rawResponse = await fetch(api, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + token
              },
              body: JSON.stringify({poi:data}) // Make the body of the request JSON file to send it to backend
            });
            const content = await rawResponse.json();

            console.log(content,"return");


            msg2user = content;


            return msg2user;



      }
      else
      {
          console.log(data);
           console.log("hello aladin")
            for( const element of data) { // Multiple JSON files send asyncronously to backend
              const rawResponse = await fetch(api, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization' : "Bearer " + token
                },
                body: JSON.stringify({poi:element})
              });
              const content = await rawResponse.json();

              console.log(content,"return");

              if(content.hasOwnProperty('error')) // Error from backend
              {

                    return Promise.reject(1);

              }


              msg2user = content;



            };

              return msg2user;

      }


        //return -1; // if something goes wrong in send the Valid JSON files to Server Promise

    })
      .catch(function (err) {
      error = err;
      return error;

    });



    if(error==1) // Invalid format
    {
      console.log("invalid format")
      return 1;
    }


    return msg2user;


  }

}
