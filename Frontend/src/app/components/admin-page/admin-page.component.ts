import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { CreateChartsService } from './../../services/create-charts.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ValidatorsService } from 'src/app/services/validators.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit{

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  @ViewChild(MatDatepicker) picker2: MatDatepicker<Date>;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  Date_Form : FormGroup;
  ok_start: number = 0;
  Visits : boolean = false;
  CovidVisits : boolean = false;
  DateForm:FormGroup;
  inDate: any;
  dataNotFound: number = 0;
  chartData: any;
  chart: Chart;
  LineVisits: boolean = false;
  LineCases: boolean = false;



  displayedColumns1: string[];
  dataSource1:any;
  length1 : number;

  displayedColumns2: string[];
  dataSource2:any;
  length2: number;


  constructor(private chartService: CreateChartsService,
    private validators: ValidatorsService,
    private fb: FormBuilder,
    ) { }


    createFormGroup(): FormGroup{
      return new FormGroup({
          start: new FormControl("",[Validators.required,this.validators.isDate()
            ,this.validators.isFuture()]),
          end: new FormControl("",[Validators.required,this.validators.isDate()
              ,this.validators.isFuture()])
          },
          {
            validators: this.validators.withinGoodRange()
          }
       );
     }

     createFormGroup2(): FormGroup{
      return new FormGroup({
          dateLine: new FormControl("",[Validators.required,this.validators.isDate()
            ,this.validators.isFuture()])
       });
     }


    ngOnInit(): void {
    this.chartService.createChart();

    this.Date_Form  = this.createFormGroup();

    this.DateForm = this.createFormGroup2();
    this.chartService.buildlineChart(0,0);
    this.crTableFromClassify();
  }






  get_start_error()   {
    if (this.Date_Form.get("start")!.hasError('wrong_data')) {
      return 'You must not enter a future date';
    }

    else if(this.Date_Form.get("start")!.hasError('wrong_date'))
    {
        return 'You must enter a valid date!';
    }

    else if(this.Date_Form.get('start')!.hasError('required'))
    {
          return 'You should enter a Date!'
    }


    return null;


  }


  get_end_error()   {
    if (this.Date_Form.get("end")!.hasError('wrong_data')) {

      return 'You must not enter a future date';
    }

    else if(this.Date_Form.get("end")!.hasError('wrong_date'))
    {

        return 'You must enter a date!';
    }

    else if(this.Date_Form.get('end')!.hasError('required'))
    {
      return 'You should enter a valid ending date also!'
    }

    return null;

  }


  week_data()
  {


      this.Date_Form.value.end = this.Date_Form.value.end.plus({
        days: 1
      });


      if(this.Visits && !this.CovidVisits)
      {

        this.chartService.myChart.destroy();


        this.chartService.WeekData(this.Date_Form.value.start,this.Date_Form.value.end)
        .subscribe(()=>{


            this.chartService.createChart();
        })
      }

      else if(this.CovidVisits && !this.Visits)
      {

        this.chartService.myChart.destroy();


        this.chartService.WeekDataCovid(this.Date_Form.value.start,this.Date_Form.value.end)
        .subscribe(()=>{


          this.chartService.createChart();
        })
      }

      else if(this.CovidVisits && this.Visits)
      {


        this.chartService.myChart.destroy();


        this.chartService.WeekDataAll(this.Date_Form.value.start,this.Date_Form.value.end)
        .subscribe(()=>{


          this.chartService.createChartAll();
        })

      }

  }


  month_data()
  {


    if(this.Visits && !this.CovidVisits)
    {

      this.chartService.myChart.destroy();


      this.chartService.MonthData(this.Date_Form.value.start)
      .subscribe(()=>{


          this.chartService.createChart();
      })
    }

    else if(this.CovidVisits && !this.Visits)
    {

      this.chartService.myChart.destroy();


      this.chartService.MonthCovidData(this.Date_Form.value.start)
      .subscribe(()=>{


        this.chartService.createChart();
      })
    }

    else if(this.CovidVisits && this.Visits)
    {

      this.chartService.myChart.destroy();


      this.chartService.MonthDataAll(this.Date_Form.value.start)
      .subscribe(()=>{


        this.chartService.createChartAll();
      })

    }



  }



  postChartData(){

    this.chartService.getlineChartData(this.DateForm.value.dateLine)
    .subscribe( (data)=>{

      console.log(data);

      if (data==1 || data==undefined)
    {
      this.dataNotFound = 1;
      setTimeout( () => {
        this.dataNotFound = 0;
      },5000);
    }
      else{
        if(this.LineVisits == true && this.LineCases == true){
          this.chartData = [data[0][0][0],data[1][0][0]];
          this.chartService.lineChart.destroy();
          this.chartService.buildlineChart(this.chartData, 2);
        }
        else if(this.LineVisits == true && this.LineCases == false){
          this.chartData = data[1][0][0];
          this.chartService.lineChart.destroy();
          this.chartService.buildlineChart(this.chartData, -1);
        }
        else if(this.LineVisits == false && this.LineCases == true){
          this.chartData = data[0][0][0];
          this.chartService.lineChart.destroy();
          this.chartService.buildlineChart(this.chartData, 1);
        }
        else if(this.LineVisits == false && this.LineCases == false){
          this.chartService.lineChart.destroy();
          this.chartService.buildlineChart(0,0);
        }
      }
    });
  }


  get_date_error()   {
    if (this.DateForm.get("dateLine")!.hasError('wrong_data')) {
      return 'You must  enter a future date';
    }

    else (this.DateForm.get("dateLine")!.hasError('wrong_date'))
    {
        return 'You must enter a date!'
    }
  }

  crTableFromClassify(){

    this.chartService.getClassifyData()
    .subscribe((clData) => {
      if (clData==1 || clData==undefined)
      {
      this.dataNotFound = 1;
      setTimeout( () => {
        this.dataNotFound = 0;
      },5000);
    }


    this.dataSource1 = new MatTableDataSource(clData[0][0]);
    this.length1 = clData[0][0].length;
    this.displayedColumns1 = ['types', 'avg'];

    this.dataSource1.paginator = this.paginator.toArray()[0];
    this.dataSource1.sort = this.sort.toArray()[0];


    this.dataSource2 = new MatTableDataSource(clData[1][0]);
    this.displayedColumns2 = ['types', 'NumOfCasesVisited'];
    this.length2 = clData[1][0].length;

    this.dataSource2.paginator = this.paginator.toArray()[1];
    this.dataSource2.sort = this.sort.toArray()[1];


    });

  }


  applyFilter(event:Event)
  {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }


  applyFilter2(event:Event)
  {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }





}
