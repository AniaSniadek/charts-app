import { GraphData } from 'src/app/_core/models/graph-data.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar-details-graph',
  templateUrl: './bar-details-graph.component.html',
  styleUrls: ['./bar-details-graph.component.scss'],
})
export class BarDetailsGraphComponent {
  @Input() covidDetailsData: GraphData.Group[];
  view: any = [1000, 400];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA', '#aae3f5'],
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
