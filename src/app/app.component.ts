import { Component, OnInit } from '@angular/core';
import { CovidDataService } from './_core/services/covid-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-charts';
  graph = {
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+points',
        marker: { color: 'red' },
      },
      { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: { width: 320, height: 240, title: 'A Fancy Plot' },
  };
  dataGraph: any = null;

  constructor(private readonly _covidDataService: CovidDataService){}

  ngOnInit(): void {
    this._covidDataService.getCovidData().subscribe((data: any) => {
      let names = [];
      let values = [];
      for(const [key, value] of Object.entries(data.data)){
        if(key !== 'date' &&
          !key.includes('diff') &&
          key !== 'last_update' &&
          key !== 'fatality_rate'){
            names.push(key);
            values.push(value);
          }
      }
      this.createGraph(names, values);
    })
  }

  createGraph(labels: any[], values: any[]): void {
    this.dataGraph = {
      data: [
        {
          values,
          labels,
          type: 'pie'
        }
      ],
      layout: {
        yaxis: {
          automargin: true,
        },
        width: 585,
        height: 400,
      },
      config: {
        responsive: true,
        displayModeBar: true,
      }
    }
  }
}
