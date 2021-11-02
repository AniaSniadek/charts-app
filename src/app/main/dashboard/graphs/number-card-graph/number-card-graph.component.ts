import { Component, Input } from '@angular/core';
import { GraphData } from 'src/app/_core/models/graph-data.model';

@Component({
  selector: 'app-number-card-graph',
  templateUrl: './number-card-graph.component.html',
  styleUrls: ['./number-card-graph.component.scss'],
})
export class NumberCardGraphComponent {
  @Input() covidData: GraphData.Simple[];

  view: any = [700, 400];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  cardColor: string = '#232837';

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
