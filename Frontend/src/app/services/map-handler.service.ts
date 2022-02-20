import { catchError, first, Observable, of, pipe } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { ErrorHandlerService } from './error-handler.service';
import { Shops } from '../models/Shops';
import * as L from 'leaflet';
import { StoreVisitComponent } from '../components/store-visit/store-visit.component';
import { MatDialog } from '@angular/material/dialog';
import * as $ from "jquery";
import { SaveVisitService } from './save-visit.service';
import { AuthService } from './auth.service';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class MapHandlerService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private saveVisit: SaveVisitService,
    private auth: AuthService,
    public dialog2: MatDialog) { }

  private url = "http://localhost:3000/mypos/mycoords";
  private url2 = "http://localhost:3000/shops";

  mymap: any;
  numVisitor:number = 0;
  saveOK:boolean;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" ,
      "Cache-Control" : 'private max-age=60',
       "Expires" : '60'}),
  };






   send_backend_coords(lat: number,
     lng:number, email: Pick<User,"email">) : any
    {
        return this.http
        .post(this.url, { lat, lng , email }, this.httpOptions)
        .pipe(
          first(Object),
          catchError(this.errorHandlerService.handle_sendcoords_error<string>(" ")),
        ).subscribe();
     }

   get_shops20meters() : Observable<Shops>
  {
    return this.http
    .get<Shops[]>(`${this.url2}/getShopsNear`,{ responseType: "json" })
    .pipe(
      catchError(this.errorHandlerService.handle_getshops_error<any>(" "))
    );
  }

    create_map()
    {
      if (!navigator.geolocation) {
        console.log('location is not supported');}

         navigator.geolocation.getCurrentPosition( async (position) => {
            const coords = position.coords;
            const latLong :[number,number] = [coords.latitude, coords.longitude];
            console.log(
            `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);

            this.mymap = L.map('map').setView(latLong, 13);

            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
           {
              attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: 'mapbox/streets-v11',
              tileSize: 512,
              zoomOffset: -1,
              accessToken: 'your.mapbox.access.token',
          }
          ).addTo(this.mymap);


        let marker = L.marker(latLong, {
          icon: L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        })
        .addTo(this.mymap);

        marker.bindPopup('<b>Hi</b>').openPopup();

        let popup = L.popup()
          .setLatLng(latLong)
          .openOn(this.mymap)
          .setContent('Hi')

         this.send_backend_coords(coords.latitude,coords.longitude,this.auth.userEmail);

          this.watchPosition();

      })
    }

    watchPosition() {
      let desLat = 0;
      let desLon = 0;
      let id = navigator.geolocation.watchPosition(
        (position) => {
          console.log(
            `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
          );
          if (position.coords.latitude === desLat || this.auth.isUserLoggedIn$.value == false || this.auth.isAdminLoggedIn$.value == false) {
            navigator.geolocation.clearWatch(id);
          }
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }



    makeMarkerSingle(poi: any){

      const latlong: [number,number] = [poi.latitude,poi.longitude]
      let color: string;


      if(poi.currentPopularity < 32){
        color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
      }
      else if(poi.currentPopularity > 64){
        color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
      }
      else{
        color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
      }

      let marker = L.marker(latlong,{
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: color,
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      }).addTo(this.mymap);


      console.log(poi.currentPopularity);

      const popup =
            L.popup().setContent(
              '<body>' +
              '<b>'+poi.name+'<br>'+poi.address+'<br>Rating: '+poi.rating.toFixed(2)+'<br>CurrentPopularity: '+poi.currentPopularity+ '<br/>' +
               '<button type="button" mat-raised-button id="dialog" (click)="openDialog2(poi.id)">'+
               'Wanna save your post?</button>'+'</body>');

              marker.bindPopup(popup).on("popupopen", () => {
                $("#dialog").on("click", e => {
                  e.preventDefault();
                  console.log(`now i want u back`);
                  this.openDialog2(poi.id);
                });
                })

    }

    makeMarkerMulti(poi: any){

      const latlong: [number,number] = [poi.latitude,poi.longitude]
      let color: string;



      if(poi.currentPopularity < 32){
        color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
      }
      else if(poi.currentPopularity > 64){
        color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
      }
      else{
        color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
      }

      let marker = L.marker(latlong,{
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: color,
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      }).addTo(this.mymap);


      console.log(poi.currentPopularity);



      const popup =
            L.popup().setContent(
              '<body>' +
              '<b>'+poi.name+'<br>'+poi.address+'<br>Rating: '+poi.rating.toFixed(2)+'<br>CurrentPopularity: '+poi.currentPopularity+ '<br/>' +
               '<button type="button" mat-raised-button id="dialog" (click)="openDialog2(poi.id)">'+
               'Wanna save your post?</button>'+'</body>');

      marker.bindPopup(popup).on("popupopen", () => {
        $("#dialog").on("click", e => {
          e.preventDefault();
          console.log(`now i want u back`);
          this.openDialog2(poi.id);
        });
        })



    }


    openDialog2(poiID:string){

       let dialogRef = this.dialog2.open(StoreVisitComponent,{
        width: '200px',
        data: { message:"Is it ok to store your visit?" },

      });

      dialogRef.afterClosed().subscribe((result:any) => {
          if (result === undefined) result = 0;
            this.numVisitor = result;
            this.saveVisit.send_users_visit(this.auth.userId,poiID,this.numVisitor)
            .subscribe( (ok)=>{
              this.saveOK = ok;
              return this.saveOK;
            });

    });
    }






}

