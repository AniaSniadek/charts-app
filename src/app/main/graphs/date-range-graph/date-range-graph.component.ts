import { Component, Input } from '@angular/core';
import { CovidDataSimple } from 'src/app/_core/models/covid-data-simple.interface';
import { GraphTrace } from 'src/app/_core/models/graph-trace.interface';

@Component({
  selector: 'date-range-graph',
  templateUrl: './date-range-graph.component.html',
  styleUrls: ['./date-range-graph.component.scss'],
})
export class DateRangeGraphComponent {
  @Input() noStatus: boolean;
  @Input() set covidData(data: CovidDataSimple[]) {
    data && this.createLineGraph(this.preapreDataForGraph(data));
  }

  dataGraph: any;

  preapreDataForGraph(data: CovidDataSimple[]): GraphTrace[] {
    const dates: string[] = data.map(
      (element: CovidDataSimple) => element.Date.split('T')[0]
    );
    if (this.noStatus) {
      return [
        {
          x: dates,
          y: data.map((element: CovidDataSimple) => element.Confirmed),
          name: 'confirmed',
        },
        {
          x: dates,
          y: data.map((element: CovidDataSimple) => element.Deaths),
          name: 'deaths',
        },
        {
          x: dates,
          y: data.map((element: CovidDataSimple) => element.Recovered),
          name: 'recovered',
        },
        {
          x: dates,
          y: data.map((element: CovidDataSimple) => element.Active),
          name: 'active',
        },
      ];
    } else {
      return [
        {
          x: dates,
          y: data.map((element: CovidDataSimple) => element.Cases),
        },
      ];
    }
  }

  createLineGraph(traces: GraphTrace[]) {
    const data: any[] = [];
    traces.forEach((trace: GraphTrace) => {
      data.push({
        x: trace.x,
        y: trace.y,
        type: 'scatter',
        name: trace.name || undefined,
      });
    });
    this.dataGraph = {
      data: data,
      layout: {
        title: 'Line plot with Covid19 data',
      },
      config: {
        responsive: true,
      },
    };
  }
}
