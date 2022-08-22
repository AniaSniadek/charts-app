import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsRangeDialogComponent } from 'src/app/details-range-dialog/details-range-dialog.component';
import { GraphData } from 'src/app/_core/models/graph-data.model';

const DEFAULT_COLORS: string[] = ['#f49654', '#76c68f', '#d43d51'];
const DEFAULT_WIDTH: number = 1000;
const DEFAULT_HEIGHT: number = 400;
const DIALOG_WIDTH: string = '1200px';
const DIALOG_MIN_HEIGHT: string = '500px';

@Component({
  selector: 'app-bubble-graph',
  templateUrl: './bubble-graph.component.html',
  styleUrls: ['./bubble-graph.component.scss'],
})
export class BubbleGraphComponent {
  @Input('covidDetailsData') set covidData(data: GraphData.Group[]) {
    this.covidDetailsData = data;
    this.setMinAndMaxValues();
  }
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
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number;
  yScaleMax: number;
  colorScheme: any = {
    domain: DEFAULT_COLORS,
  };
  covidDetailsData: GraphData.Group[];

  constructor(private readonly _dialog: MatDialog) {}

  setMinAndMaxValues(): void {
    const maxValues: number[] = [];
    const minValues: number[] = [];
    this.covidDetailsData.forEach((element: GraphData.Group) => {
      maxValues.push(Math.max(...element.series.map((value: any) => value.y)));
      minValues.push(Math.min(...element.series.map((value: any) => value.y)));
    });
    this.yScaleMax = Math.max(...maxValues);
    this.yScaleMin = Math.min(...minValues);
  }

  onSelect(data: GraphData.ClickedValue): void {
    if (typeof data !== 'string') {
      this._dialog.open(DetailsRangeDialogComponent, {
        width: DIALOG_WIDTH,
        minHeight: DIALOG_MIN_HEIGHT,
        data: {
          countryName: data.name,
          date: this.selectedDate,
          status: data.series,
        },
      });
    }
  }
}
