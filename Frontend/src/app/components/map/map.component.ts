import { SaveVisitService } from './../../services/save-visit.service';
import { AuthService } from './../../services/auth.service';
import { StoreVisitComponent } from './../store-visit/store-visit.component';
import { MapHandlerService } from './../../services/map-handler.service';
import { Component, OnInit } from '@angular/core';
import { map} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit{



  constructor(
    private handler_map:MapHandlerService,
    public dialog: MatDialog,
    private auth: AuthService,
    private saveVisit: SaveVisitService
    ) { }

  coords : [number,number];



  nearShops: any;
  curr_shop: {};
  mymap: any;
  store_ok: any;
  poiId: string;
  userId: number;
  n_visitors: number;
  save_ok: boolean;
  search_err: number;
  near_shops_error : number;

  setSearchError(err: any) {
    console.log(err);
    this.search_err = err;
  }


  openDialog(){

    console.log("HELP");
     let dialogRef = this.dialog.open(StoreVisitComponent,{
      width: '200px',
      data: { message:"Is it ok to store your visit?" },

    });

    dialogRef.afterClosed().subscribe(result => {
        if (result === undefined) result = 0;
          this.n_visitors = result;
          this.saveVisit.send_users_visit(this.auth.userId,this.poiId,this.n_visitors)
          .subscribe( (ok)=>{
            this.save_ok = ok;
            return this.save_ok;
          });

  });
  }




  ngOnInit() {

    this.handler_map.create_map();


  }




  show_shops_on_map()
  {
    return this.handler_map.get_shops20meters()
    .pipe(map((shop:any)=> {

          console.log(shop);


            if(shop===undefined)
            {
                  this.near_shops_error = 1;
                  return this.near_shops_error;
            }


            this.nearShops = shop[0];
            console.log(this.nearShops);



            if(this.nearShops.length == 1)
            {
              this.handler_map.makeMarkerSingle(this.nearShops[0]);
            }

            else
            {


            for(let i = 0; i<this.nearShops.length-1; i++)
            {

              this.handler_map.makeMarkerMulti(this.nearShops[i]);
          }



        }
            return 0;
        })).subscribe()
  }








}



