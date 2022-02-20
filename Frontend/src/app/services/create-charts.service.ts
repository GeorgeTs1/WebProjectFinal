import { Shops_History } from './../models/shops_history';
import { SaveVisitService } from './save-visit.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { catchError, first, map, Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { DateTime } from 'luxon';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CreateChartsService {

  private url = "http://localhost:3000/shops/visits-history";
  private url2 = "http://localhost:3000/covid_case/registers-history";
  private url4 = "http://localhost:3000/barchart";
  private url5 = "http://localhost:3000/linechart";


  private url6 = "http://localhost:3000/week_month/week";
  private url7 = "http://localhost:3000/week_month/month";
  private url8 = "http://localhost:3000/classify";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  myLabel : string[] = [];
  myData  : any = [];
  colors  : string[] = [];
  myChart : any;
  myVisitData : any = [];
  myCovidData : any = [];
  lineChartData1 :any = [];
  lineChartData2:any = [];
  title :string = "Title ";
  myOptions: Object = {responsive: false,

    plugins: {
      title: {
        display: true,
        text: 'Visits Per Day'
      }
    },
    scales: {
      y: {
        min: 0,
        suggestedMax: 500,

        ticks: {
          stepSize: 50
        }

      }
    }
   }






  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {}


  fetch_visits(email:Pick<User,"email">)
  {
    return this.http
      .post<User>(`${this.url}`, {email}, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handle_shops_history_error<User>(" ")),
      );
  }


  fetch_covid_registers(id:Pick<User,"id">)
  {
    return this.http
      .post<User>(`${this.url2}`, {id}, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handle_covid_registers_error<User>(" ")),
      );
  }



  generateRandomColor(){
      let maxVal = 0xFFFFFF; // 16777215
      let i = 0;
     do
     {
      i = i +1;
      let randomNumber = Math.random() * maxVal;
      randomNumber = Math.floor(randomNumber);
      let randomNumberStr = randomNumber.toString(16);
      let randColor = randomNumberStr.padStart(6, '0');
      this.colors.push(randColor);

     }while(i < this.myLabel.length);

    }




  createChart()
  {

  const canvas = <HTMLCanvasElement> document.getElementById('myChart');
  const ctx = canvas.getContext('2d');

  this.myChart = new Chart(ctx!  , {
    type: 'bar',
    data: {
        labels: this.myLabel,
        datasets: [{
            label: this.title,
            data: this.myData,
            backgroundColor: this.colors
            ,
            borderColor: this.colors,
            borderWidth: 1
        }]
    },
    options: this.myOptions



});

  }


  createChartAll()
  {

  const canvas = <HTMLCanvasElement> document.getElementById('myChart');
  const ctx = canvas.getContext('2d');

  this.myChart = new Chart(ctx!  , {
    type: 'bar',
    data: {
        labels: this.myLabel,
        datasets: [{
            label: 'Visits of Users Per Day',
            data: this.myVisitData,
            backgroundColor: 'rgba(82, 78, 183)'
            ,
            borderColor: 'rgba(82, 78, 183)',
            borderWidth: 1
        },{

            label: 'Covid Visits of Users Per Day',
            data: this.myCovidData,
            backgroundColor: 'rgba(255, 0, 0)'
            ,
            borderColor: 'rgba(82, 78, 183)',
            borderWidth: 1

        }

      ]
    },
    options: this.myOptions

});

  }




WeekData(start:DateTime, end: DateTime)
{
  return this.http
      .post(`${this.url6}`, {start,end}, this.httpOptions)
      .pipe(
        first(),
        map((data:any)=>{
            let i=1;
            let visits : number[] = Object.values(data.Visits[0][0]);
            this.myData = visits;

            let WeekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


            let date_num=start.weekday

            if(this.myLabel.length !=0)
            {
              this.myLabel = [];
            }

            this.myLabel.push(WeekNames[date_num]);
            console.log(this.myLabel);
            while(i <= 7){
                start = start.plus({days: 1});
                console.log(start.weekday);
                let date_num  = start.weekday;
                let dayName = WeekNames[date_num];
                this.myLabel.push(dayName);
                i++;

              }
            this.title = "Visits of Users Per Day";
            this.colors.splice(0, this.colors.length)
            this.colors.push('rgba(82, 78, 183)');
            this.myOptions



        }),
        catchError(this.errorHandlerService.handle_week_error(" ")),
      );
}



WeekDataCovid(start:DateTime, end: DateTime)
{
  return this.http
      .post(`${this.url6}`, {start,end}, this.httpOptions)
      .pipe(
        first(),
        map((data:any)=>{
            let i=1;
            let CovidVisits : number[] = Object.values(data.Visits[1][0]);
            this.myData = CovidVisits;


            let WeekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


            let date_num=start.weekday

            if(this.myLabel.length !=0)
            {
              this.myLabel = [];
            }

            this.myLabel.push(WeekNames[date_num]);
            console.log(this.myLabel);
            while(i <= 7){
                start = start.plus({days: 1});
                console.log(start.weekday);
                let date_num  = start.weekday;
                let dayName = WeekNames[date_num];
                this.myLabel.push(dayName);
                i++;

              }

            this.title = "Covid Visits of Users Per Day";
            this.colors.splice(0, this.colors.length);
            this.colors.push('rgba(255, 0, 0)');



        }),
        catchError(this.errorHandlerService.handle_week_covid_error(" ")),
      );
}



WeekDataAll(start:DateTime, end: DateTime)
{
  return this.http
      .post(`${this.url6}`, {start,end}, this.httpOptions)
      .pipe(
        first(),
        map((data:any)=>{
            let i=1;
            let Visits : number[] = Object.values(data.Visits[0][0]);
            let CovidVisits : number[] = Object.values(data.Visits[1][0]);
            this.myVisitData = Visits;
            this.myCovidData = CovidVisits;
            let WeekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


            let date_num=start.weekday

            if(this.myLabel.length !=0)
            {
              this.myLabel = [];
            }

            this.myLabel.push(WeekNames[date_num]);
            console.log(this.myLabel);
            while(i <= 7){
                start = start.plus({days: 1});
                console.log(start.weekday);
                let date_num  = start.weekday;
                let dayName = WeekNames[date_num];
                this.myLabel.push(dayName);
                i++;

              }


        }),
        catchError(this.errorHandlerService.handle_week_covid_error(" ")),
      );
}



MonthData(date: DateTime)
{


  return this.http
      .post(`${this.url7}`, {date}, this.httpOptions)
      .pipe(
        first(),
        map((data:any)=>{
            let i=1;
            let visits : number[] = Object.values(data.MonthVisits[0][0]);
            this.myData = visits;

            let WeekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


            let first_day_of_month = date.startOf('month').weekday;

            let start_day = date.startOf('month');

            if(this.myLabel.length !=0)
            {
              this.myLabel = [];
            }

            this.myLabel.push(WeekNames[first_day_of_month]);
            while(i < date.daysInMonth){
                start_day  = start_day.plus({days: 1});
                let date_num  = start_day.weekday;
                let dayName = WeekNames[date_num];
                this.myLabel.push(dayName);
                i++;
              }
            this.title = `Visits of Users Per Day for Month ${date.monthLong}`;
            this.colors.splice(0, this.colors.length)
            this.colors.push('rgba(82, 78, 183)');



        }),
        catchError(this.errorHandlerService.handle_month_error(" ")),
      );



}



MonthCovidData(date: DateTime)
{


  return this.http
      .post(`${this.url7}`, {date}, this.httpOptions)
      .pipe(
        first(),
        map((data:any)=>{
            let i=1;
            let visits : number[] = Object.values(data.MonthVisits[1][0]);
            this.myData = visits;

            let WeekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


            let first_day_of_month = date.startOf('month').weekday;

            let start_day = date.startOf('month');

            if(this.myLabel.length !=0)
            {
              this.myLabel = [];
            }

            this.myLabel.push(WeekNames[first_day_of_month]);
            while(i < date.daysInMonth){
                start_day  = start_day.plus({days: 1});
                let date_num  = start_day.weekday;
                let dayName = WeekNames[date_num];
                this.myLabel.push(dayName);
                i++;
              }
            this.title = `Covid Visits of Users Per Day for Month ${date.monthLong}`;
            this.colors.splice(0, this.colors.length)
            this.colors.push('rgba(255, 0, 0)');



        }),
        catchError(this.errorHandlerService.handle_month_covid_error(" ")),
      );



}


MonthDataAll(date: DateTime)
{


  return this.http
      .post(`${this.url7}`, {date}, this.httpOptions)
      .pipe(
        first(),
        map((data:any)=>{
            let i=1;
            let Visits4Month : number[] = Object.values(data.MonthVisits[0][0]);
            let CovidVisits4Month : number[] = Object.values(data.MonthVisits[1][0]);
            this.myVisitData = Visits4Month;
            this.myCovidData = CovidVisits4Month;

            let WeekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


            let first_day_of_month = date.startOf('month').weekday;

            let start_day = date.startOf('month');

            if(this.myLabel.length !=0)
            {
              this.myLabel = [];
            }

            this.myLabel.push(WeekNames[first_day_of_month]);
            while(i < date.daysInMonth){
                start_day  = start_day.plus({days: 1});
                let date_num  = start_day.weekday;
                let dayName = WeekNames[date_num];
                this.myLabel.push(dayName);
                i++;
              }

        }),
        catchError(this.errorHandlerService.handle_week_error(" ")),
      );



}

getBarChartData()
: Observable<any>
{
return this.http.
post(`${this.url4}/barCHART`, {})
.pipe(
  first(),
  //catchError(this.errorHandlerServivce.handle_searchShop_error<any>(''))
);
}

buildbarChart(chartData: any): void {
  const barCanvasEle: any = document.getElementById('bar-chart')

    const ctx = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
          labels: ['All visits', "Covid Cases", "Covid Case's visits"],
          datasets: [{
              label: 'chart for a,b,c',
              data: [chartData[0][0].c, chartData[1][0].c, chartData[2][0].c],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: false,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}



getlineChartData(inData: any)
: Observable<any>
{
return this.http.
post(`${this.url5}/lineCHART`, {value:inData})
.pipe(
  first(),
);
}

lineChart :any;

buildlineChart(chartData: any, flag: number): void {
  console.log(chartData);
  if(flag == 2){ //both flag = 2
     this.lineChartData1 = chartData[1][0];
     this.lineChartData2 = chartData[0][0];
  }
  else if(flag == 1){ //cases flag = 1
    this.lineChartData1 = chartData[0];
    this.lineChartData2 = 0;
  }
  else if(flag == -1){ //visits flag=-1
    this.lineChartData2 = chartData[0];
    this.lineChartData1 = 0;
  }
  else if( flag == 0){// none flag = 0
    this.lineChartData1 = 0;
     this.lineChartData2 = 0;
  }

  const lineCanvasEle: any = document.getElementById('line-chart')
  const ctx = lineCanvasEle.getContext('2d');



  this.lineChart = new Chart(ctx!,{
    type: 'line',
      data: {
        labels: [],
        datasets: [
          { data: this.lineChartData1, label: 'Cases', borderColor: 'rgb(225, 173, 1)' },
          { data: this.lineChartData2, label: 'Visits', borderColor: 'rgb(75, 192, 192)' },
        ],
      },
      options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
    });


}



getClassifyData()
: Observable<any>
{
  return this.http.
  get(`${this.url8}/CLASSIFY`, {})
  .pipe(
    first(),
  //catchError(this.errorHandlerServivce.handle_searchShop_error<any>(''))
  );
}


}










