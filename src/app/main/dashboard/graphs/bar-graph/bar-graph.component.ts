import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent {
  @Input() covidData: { name: string; value: number }[];

  view: any = [600, 200];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showGridLines: boolean = false;
  showXAxisLabel: boolean = true;
  // yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  // xAxisLabel: string = 'Active';

  colorScheme: any = {
    domain: ['#7AA3E5'],
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
