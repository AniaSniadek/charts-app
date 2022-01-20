import { GraphData } from 'src/app/_core/models/graph-data.model';
import { Component, Input } from '@angular/core';

const DEFAULT_COLORS: string[] = [
  '#2059D1',
  '#329FD1',
  '#AFFFFF',
  '#D2D058',
  '#D19D31',
];
const DEFAULT_WIDTH: number = 1000;
const DEFAULT_HEIGHT: number = 250;

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent {
  @Input() covidData: GraphData.Simple[];

  view: [number, number] = [DEFAULT_WIDTH, DEFAULT_HEIGHT];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showGridLines: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Active';
  colorScheme: any = {
    domain: DEFAULT_COLORS,
  };

  xAxisFormatting(value: number): string {
    return value.toLocaleString();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
