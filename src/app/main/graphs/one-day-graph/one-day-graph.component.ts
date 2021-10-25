import { Component, Input } from '@angular/core';
import { CovidDataSimple } from 'src/app/_core/models/covid-data-simple.interface';
import { GraphTrace } from 'src/app/_core/models/graph-trace.interface';

@Component({
  selector: 'one-day-graph',
  templateUrl: './one-day-graph.component.html',
  styleUrls: ['./one-day-graph.component.scss'],
})
export class OneDayGraphComponent {
  @Input() set covidData(data: CovidDataSimple) {
    data && this.createBarGraph(this.preapreDataForGraph(data));
  }

  dataGraph: any;

  preapreDataForGraph(covidData: CovidDataSimple): GraphTrace {
    return {
      x: ['confirmed', 'deaths', 'recovered', 'active'],
      y: [
        covidData.Confirmed,
        covidData.Deaths,
        covidData.Recovered,
        covidData.Active,
      ],
      type: 'bar',
    };
  }

  createBarGraph(trace: GraphTrace) {
    this.dataGraph = {
      data: [trace],
      layout: {
        title: 'Bar plot with Covid19 data',
      },
      config: {
        responsive: true,
      },
    };
  }
}
