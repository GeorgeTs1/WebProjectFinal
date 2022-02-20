import {OnInit, Component} from '@angular/core';
import { Chart } from 'chart.js';
import { CreateChartsService } from 'src/app/services/create-charts.service';


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styles: [`
      :host {
          display: inline-block;
          position: relative;
      }
  `]
})

export class BarChartComponent implements OnInit{

  private chart: Chart;
  private chartData: any;
  dataNotFound: number = 0;

  constructor(private createchartservice:CreateChartsService) {}

  ngOnInit(): void {

    this.createchartservice.getBarChartData()
    .subscribe( (data)=>{

      if (data==1 || data==undefined)
    {
      this.dataNotFound = 1;
      setTimeout( () => {
        this.dataNotFound = 0;
      },5000);
    }
      else{

        this.chartData = [data[0][0],data[1][0],data[2][0]];

        this.createchartservice.buildbarChart(this.chartData);

      }
    });
  }



}
