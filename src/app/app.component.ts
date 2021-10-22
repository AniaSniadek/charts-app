import { Component } from '@angular/core';
import { CovidDataService } from './_core/services/covid-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataGraph: any = null;

  constructor(private readonly _covidDataService: CovidDataService) {}

  getCovidData(): void {
    this._covidDataService.getCovidData().subscribe((data: any) => {
      const names: any[] = [];
      const values: any[] = [];
      for (const [key, value] of Object.entries(data.data)) {
        if (
          key !== 'date' &&
          !key.includes('diff') &&
          key !== 'last_update' &&
          key !== 'fatality_rate'
        ) {
          names.push(key);
          values.push(value);
        }
      }
      this.createGraph(names, values);
    });
  }

  createGraph(labels: any[], values: any[]) {
    this.dataGraph = {
      data: [
        {
          values,
          labels,
          type: 'pie',
        },
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
      },
    };
  }
}
