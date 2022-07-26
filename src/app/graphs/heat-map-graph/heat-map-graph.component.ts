import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LegendPosition } from '@swimlane/ngx-charts';
import { DetailsRangeDialogComponent } from 'src/app/details-range-dialog/details-range-dialog.component';
import { GraphData } from 'src/app/_core/models/graph-data.model';

const DEFAULT_WIDTH: number = 1000;
const DEFAULT_HEIGHT: number = 400;
const DIALOG_WIDTH: string = '1200px';
const DIALOG_MIN_HEIGHT: string = '500px';

@Component({
  selector: 'app-heat-map-graph',
  templateUrl: './heat-map-graph.component.html',
  styleUrls: ['./heat-map-graph.component.scss'],
})
export class HeatMapGraphComponent {
  @Input() covidDetailsData: GraphData.Group[];
  @Input() selectedDate: Date;

  view: [number, number] = [DEFAULT_WIDTH, DEFAULT_HEIGHT];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Cases';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  legendPosition: LegendPosition = LegendPosition.Right;

  constructor(private readonly _dialog: MatDialog) {}

  onSelect(data: GraphData.ClickedValue): void {
    if (typeof data !== 'string') {
      this._dialog.open(DetailsRangeDialogComponent, {
        width: DIALOG_WIDTH,
        minHeight: DIALOG_MIN_HEIGHT,
        data: {
          countryName: data.series,
          date: this.selectedDate,
          status: data.name,
        },
      });
    }
  }
}
