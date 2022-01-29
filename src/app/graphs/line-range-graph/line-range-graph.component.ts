import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { GraphData } from 'src/app/_core/models/graph-data.model';

const DEFAULT_COLORS: string[] = [
  '#2059D1',
  '#329FD1',
  '#AFFFFF',
  '#D2D058',
  '#D19D31',
];
const DEFAULT_WIDTH: number = 950;
const DEFAULT_HEIGHT: number = 400;

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
  colorScheme: any = {
    domain: DEFAULT_COLORS,
  };

  yAxisFormatting(value: number): string {
    return value.toLocaleString();
  }
}
