import { GraphData } from 'src/app/_core/models/graph-data.model';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsRangeDialogComponent } from 'src/app/details-range-dialog/details-range-dialog.component';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';

const DEFAULT_COLORS: string[] = [
  '#2059D1',
  '#329FD1',
  '#AFFFFF',
  '#D2D058',
  '#D19D31',
];
const DEFAULT_WIDTH: number = 1000;
const DEFAULT_HEIGHT: number = 250;
const DIALOG_WIDTH: string = '1000px';
const DIALOG_MIN_HEIGHT: string = '500px';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent {
  @Input() covidData: GraphData.Simple[];
  @Input() selectedDate: Date;

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
  private readonly covidStatus: CovidStatus = CovidStatus.ACTIVE;

  constructor(private readonly _dialog: MatDialog) {}

  xAxisFormatting(value: number): string {
    return value.toLocaleString();
  }

  onSelect(data: Partial<GraphData.ClickedValue>): void {
    if (typeof data !== 'string') {
      this._dialog.open(DetailsRangeDialogComponent, {
        width: DIALOG_WIDTH,
        minHeight: DIALOG_MIN_HEIGHT,
        data: {
          countryName: data.name,
          date: this.selectedDate,
          status: this.covidStatus,
        },
      });
    }
  }
}
