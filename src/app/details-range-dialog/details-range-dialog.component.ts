import { CovidData } from './../_core/models/covid-data';
import { CovidStatus } from './../_core/enums/covid-status.enum';
import { RangeFormData } from './../_core/models/range-form-data.interface';
import { CovidDataService } from './../_core/services/covid-data.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { GraphData } from '../_core/models/graph-data.model';

const DEFAULT_DATE_FORMAT: string = 'YYYY-MM-DD';
const DAYS_RANGE: number = 30;

@Component({
  selector: 'app-details-range-dialog',
  templateUrl: './details-range-dialog.component.html',
  styleUrls: ['./details-range-dialog.component.scss'],
})
export class DetailsRangeDialogComponent {
  private _subscription: Subscription = new Subscription();
  formData: RangeFormData;
  showGraph: boolean = false;
  covidData: GraphData.Group[];

  constructor(
    public dialogRef: MatDialogRef<DetailsRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _covidDataService: CovidDataService
  ) {
    this.formData = {
      startDate: new Date(
        moment(data.date).subtract(DAYS_RANGE, 'd').format(DEFAULT_DATE_FORMAT)
      ),
      endDate: data.date,
      country: data.countryName,
      status: data.status,
    };
    console.log(this.formData);
    this.getCovidDataByDateAndCountry(
      this.formData.country,
      this.formData.startDate,
      this.formData.endDate,
      this.formData.status
    );
  }

  getCovidDataByDateAndCountry(
    country: string,
    startDate: Date,
    endDate: Date,
    status: CovidStatus
  ): void {
    this._subscription.add(
      this._covidDataService
        .getCovidDataFromCsv()
        .pipe(
          map((data: CovidData[]) =>
            data.filter((element: CovidData) => element.country === country)
          ),
          map((data: CovidData[]) =>
            data.filter(
              (element: CovidData) =>
                new Date(element.date).getTime() <= endDate.getTime() &&
                new Date(element.date).getTime() >= startDate.getTime()
            )
          ),
          tap((response: CovidData[]) => {
            console.log(response);
            if (response.length) {
              this.covidData = this.prepareCovidData(response, status);
              this.showGraph = true;
            } else {
              this.covidData = [];
              this.showGraph = false;
            }
          })
        )
        .subscribe()
    );
  }

  prepareCovidData(data: CovidData[], status: CovidStatus): GraphData.Group[] {
    return [
      {
        name: status,
        series: data.map((element: CovidData) => ({
          value: element[status.toLowerCase()],
          name: new Date(element.date),
        })),
      },
    ];
  }
}
