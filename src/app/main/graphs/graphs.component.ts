import { Component, Input } from '@angular/core';
import { CovidDataSimple } from 'src/app/_core/models/covid-data-simple.interface';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent {
  @Input() noStatus: boolean;
  @Input() set covidData(data: CovidDataSimple[]) {
    if (data) {
      console.log(this.noStatus);
      const cases: number[] = data.map(
        (element: CovidDataSimple) => element.Cases
      );
      const dates: string[] = data.map(
        (element: CovidDataSimple) => element.Date.split('T')[0]
      );
      this.createStatusGraph(dates, cases);
    }
  }

  dataGraph: any;

  createStatusGraph(x: any[], y: any[]) {
    this.dataGraph = {
      data: [
        {
          x,
          y,
          type: 'scatter',
        },
      ],
      config: {
        responsive: true,
      },
    };
  }
}
