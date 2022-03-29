import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsRangeDialogComponent } from 'src/app/details-range-dialog/details-range-dialog.component';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { GraphData } from 'src/app/_core/models/graph-data.model';

const DEFAULT_COLORS: string[] = [
  '#d43d51',
  '#f49654',
  '#fde987',
  '#88bb72',
  '#00876c',
];
const DEFAULT_WIDTH: number = 1000;
const DEFAULT_HEIGHT: number = 250;
const DIALOG_WIDTH: string = '1200px';
const DIALOG_MIN_HEIGHT: string = '600px';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() covidData: GraphData.Simple[];
  @Input() selectedDate: Date;

  view: [number, number] = [DEFAULT_WIDTH, DEFAULT_HEIGHT];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
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
