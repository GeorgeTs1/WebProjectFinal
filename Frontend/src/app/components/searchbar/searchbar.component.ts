import { LoginComponent } from './../login/login.component';
import { AllShops } from './../../models/AllPOIS';
import { MapHandlerService } from '../../services/map-handler.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchbarService } from 'src/app/services/searchbar.service';
import { MapComponent } from '../map/map.component';
import { map, Observable, startWith } from 'rxjs';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  enteredValue = '';
  searched = 'nothing';
  shopNotFound: number = 0;
  shop_name:string;

  groupedPOIS = LoginComponent.shops_name;


  POISGroupOptions: Observable<AllShops[]>;

  POISForm: FormGroup = this.formBuilder.group({
    ShopGroup: '',
  });


  ngOnInit(): void {

    this.POISGroupOptions = this.POISForm.get('ShopGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value)),
    );
  }


  constructor(private searchservice:SearchbarService
    ,private map_handler: MapHandlerService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
    ){

  }

  searchLocation(){
    this.searched = this.enteredValue;
    this.searchservice.search(this.enteredValue)
    .subscribe( (point) =>{
       console.log(point);

     if (point==1 || point==undefined)
    {
      this.shopNotFound = 1;
      setTimeout( () => {
        this.shopNotFound = 0;
      },5000);
    }
    else
      {
      if(point[0].length == 1){

        console.log(this.searched);

        this.map_handler.makeMarkerSingle(point[0][0]);
        return this.shopNotFound=0;

      }
      else{


        let i = 0;
        console.log(point[0].length);
        while(point[0].length > i){

          console.log(point[0][i]);
          this.map_handler.makeMarkerMulti(point[0][i]);
          i++;

        }
        return this.shopNotFound=0;
      }
    }
    return 0;
   });
  }



  private _filterGroup(value: string): AllShops[] {
    if (value) {
      return this.groupedPOIS
        .map( (group:any) => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter( (group:any) => group.names.length > 0);
    }

    return this.groupedPOIS;
  }


}
