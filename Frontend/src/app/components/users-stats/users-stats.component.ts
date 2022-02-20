import { AuthService } from './../../services/auth.service';
import { Shops_History } from './../../models/shops_history';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateChartsService } from 'src/app/services/create-charts.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs';
import * as moment from 'moment';



@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.scss']
})
export class UsersStatsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UsersStatsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Shops_History,
    private charts_service: CreateChartsService,
    private auth:AuthService) {}



    shops_name : string[] = [];
    date_time : string [] = [];
    new_date: string;
    new_time: string;
    new_date_time: string;
    date4registers : string[] = [];
    no_visits_error :number = 0;
    no_covid_reg_error : number = 0;
    is_Safe : string[] = [];




  ngOnInit(): void {

    this.charts_service.fetch_visits(this.auth.userEmail)
    .pipe(map( (val:any)=>{


      console.log(val,"tikas");


      val[0][0].forEach( (object:any) => {



        this.new_date = object.timeOfVisit
        .replace('T',' ')
        .substring(0,9)



        this.new_date = moment(this.new_date, 'YYYY/DD/MM')
        .format('DD/MM/YYYY')



        this.new_time = object.timeOfVisit
        .substring(11,19)


        this.new_date_time = this.new_date
        .concat(" ",this.new_time);




        this.shops_name.push(object.name);
        this.date_time.push(this.new_date_time);
        this.is_Safe.push(object.isSafe);

        console.log(this.shops_name,this.date_time);

      });

       this.charts_service.fetch_covid_registers(this.auth.userId)
            .pipe(map((val:any)=>{

              console.log(val);

              if(val==1 || val===undefined)
              {

                    this.no_covid_reg_error = 1;

                    setTimeout( () => {
                      this.no_covid_reg_error = 0;
                    },4000);

                    return this.no_covid_reg_error;
              }



                val.forEach( (object:any) => {



                      this.new_date = moment(object.lastUpdateDate, 'YYYY/MM/DD')
                      .format('DD/MM/YYYY');

                      this.date4registers.push(this.new_date);


              })

              return 0;


              })).subscribe()


  }))
  .subscribe();







  }





 }



