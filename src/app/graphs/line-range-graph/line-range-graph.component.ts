import { CovidStatus } from './../../_core/enums/covid-status.enum';
import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { GraphData } from 'src/app/_core/models/graph-data.model';

interface ColorBar {
  name: CovidStatus;
  value: string;
}

const DEFAULT_WIDTH: number = 950;
const DEFAULT_HEIGHT: number = 400;
const COLORS: ColorBar[] = [
  {
    name: CovidStatus.ACTIVE,
    value: '#ffb400',
  },
  {
    name: CovidStatus.CONFIRMED,
    value: '#54bebe',
  },
  {
    name: CovidStatus.RECOVERED,
    value: '#9080ff',
  },
  {
    name: CovidStatus.DEATHS,
    value: '#c80064',
  },
];

@Component({
  selector: 'app-line-range-graph',
  templateUrl: './line-range-graph.component.html',
  styleUrls: ['./line-range-graph.component.scss'],
})
export class LineRangeGraphComponent {
  @Input() covidData: GraphData.Group[];

  view: [number, number] = [DEFAULT_WIDTH, DEFAULT_HEIGHT];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Cases';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  showTimeline: boolean = false;
  autoScale: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;
  customColors: ColorBar[] = COLORS;

  yAxisFormatting(value: number): string {
    return value.toLocaleString();
  }
}
