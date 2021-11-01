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
    if (data) {
      this.createBarGraph(this.preapreDataForGraph(data, 'bar'));
      this.createPieGraph(this.preapreDataForGraph(data, 'pie'));
      this.createBubbleGraph(this.preapreDataForGraph(data, 'scatter'));
    }
  }

  barGraph: any;
  pieGraph: any;
  dotsGraph: any;

  preapreDataForGraph(covidData: CovidDataSimple, type: string): GraphTrace {
    return {
      x: ['confirmed', 'deaths', 'recovered', 'active'],
      y: [
        covidData.Confirmed,
        covidData.Deaths,
        covidData.Recovered,
        covidData.Active,
      ],
      type,
    };
  }

  createBubbleGraph(trace: GraphTrace): void {
    this.dotsGraph = {
      data: [
        {
          x: trace.x,
          y: trace.y,
          type: trace.type,
          mode: 'markers',
          marker: {
            color: [
              'rgb(93, 164, 214)',
              'rgb(255, 144, 14)',
              'rgb(44, 160, 101)',
              'rgb(255, 65, 54)',
            ],
            opacity: [1, 0.8, 0.6, 0.4],
            symbol: 'circle',
            size: 16,
          },
        },
      ],
      layout: {
        title: 'Dots plot with Covid19 data',
        showlegend: false,
        height: 650,
        width: 600,
      },
      config: {
        responsive: true,
      },
    };
  }

  createBarGraph(trace: GraphTrace): void {
    this.barGraph = {
      data: [trace],
      layout: {
        title: 'Bar plot with Covid19 data',
        height: 600,
        width: 600,
      },
      config: {
        responsive: true,
      },
    };
  }

  createPieGraph(trace: GraphTrace): void {
    this.pieGraph = {
      data: [
        {
          values: trace.y,
          labels: trace.x,
          type: trace.type,
        },
      ],
      layout: {
        title: 'Pie plot with Covid19 data',
        height: 400,
        width: 600,
      },
      config: {
        responsive: true,
      },
    };
  }
}
