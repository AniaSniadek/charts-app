import { Component, Input } from '@angular/core';
import { element } from 'protractor';
import { CovidDataSimple } from 'src/app/_core/models/covid-data-simple.interface';

interface GraphTrace {
  x: number[] | string[];
  y: number[] | string[];
  name?: string;
}
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent {
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
      const confirmed: number[] = data.map(
        (element: CovidDataSimple) => element.Confirmed
      );
      const deaths: number[] = data.map(
        (element: CovidDataSimple) => element.Deaths
      );
      const recovered: number[] = data.map(
        (element: CovidDataSimple) => element.Recovered
      );
      const active: number[] = data.map(
        (element: CovidDataSimple) => element.Active
      );
      const traces: GraphTrace[] = [
        {
          x: dates,
          y: confirmed,
          name: 'confirmed',
        },
        {
          x: dates,
          y: deaths,
          name: 'deaths',
        },
        {
          x: dates,
          y: recovered,
          name: 'recovered',
        },
        {
          x: dates,
          y: active,
          name: 'active',
        },
      ];
      return traces;
    } else {
      const cases: number[] = data.map(
        (element: CovidDataSimple) => element.Cases
      );
      return [
        {
          x: dates,
          y: cases,
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
      config: {
        responsive: true,
      },
    };
  }
}
