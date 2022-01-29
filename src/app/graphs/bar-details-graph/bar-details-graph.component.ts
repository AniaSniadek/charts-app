import { GraphData } from 'src/app/_core/models/graph-data.model';
import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { MatDialog } from '@angular/material/dialog';
import { DetailsRangeDialogComponent } from 'src/app/details-range-dialog/details-range-dialog.component';

const DEFAULT_COLORS: string[] = ['#5AA454', '#C7B42C', '#AAAAAA'];
const DEFAULT_WIDTH: number = 1000;
const DEFAULT_HEIGHT: number = 400;
const DIALOG_WIDTH: string = '1000px';

@Component({
  selector: 'app-bar-details-graph',
  templateUrl: './bar-details-graph.component.html',
  styleUrls: ['./bar-details-graph.component.scss'],
})
export class BarDetailsGraphComponent {
  @Input() covidDetailsData: GraphData.Group[];
  @Input() selectedDate: Date;

  view: [number, number] = [DEFAULT_WIDTH, DEFAULT_HEIGHT];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Cases';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme: any = {
    domain: DEFAULT_COLORS,
  };

  constructor(private readonly _dialog: MatDialog) {}

  yAxisFormatting(value: number): string {
    return value.toLocaleString();
  }

  onSelect(data: GraphData.ClickedValue): void {
    this._dialog.open(DetailsRangeDialogComponent, {
      width: DIALOG_WIDTH,
      data: {
        countryName: data.series,
        date: this.selectedDate,
        status: data.name,
      },
    });
  }
}
