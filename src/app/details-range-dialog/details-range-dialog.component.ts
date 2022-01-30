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
  countriesList: string[];

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
      statusList: [data.status],
    };

    this.getCountriesList();
  }

  getCovidDataByDateAndCountry(form: RangeFormData): void {
    if (form) {
      this._subscription.add(
        this._covidDataService
          .getCovidDataFromCsv()
          .pipe(
            map((data: CovidData[]) =>
              data.filter(
                (element: CovidData) => element.country === form.country
              )
            ),
            map((data: CovidData[]) =>
              data.filter(
                (element: CovidData) =>
                  moment(element.date).valueOf() <=
                    moment(form.endDate).valueOf() &&
                  moment(element.date).valueOf() >=
                    moment(form.startDate).valueOf()
              )
            ),
            tap((response: CovidData[]) => {
              if (response.length) {
                this.covidData = this.prepareCovidData(
                  response,
                  form.statusList
                );
                this.showGraph = true;
              } else {
                this.covidData = [];
                this.showGraph = false;
              }
            })
          )
          .subscribe()
      );
    } else {
      this.covidData = [];
      this.showGraph = false;
    }
  }

  prepareCovidData(
    data: CovidData[],
    statusList: CovidStatus[]
  ): GraphData.Group[] {
    return statusList.map((status: CovidStatus) => ({
      name: status,
      series: data.map((element: CovidData) => ({
        value:
          status === CovidStatus.ACTIVE
            ? element.confirmed - element.recovered - element.deaths
            : element[status.toLowerCase()],
        name: new Date(element.date),
      })),
    }));
  }

  getCountriesList(): void {
    this._subscription.add(
      this._covidDataService
        .getCountriesListFromCsv()
        .pipe(tap((countries: string[]) => (this.countriesList = countries)))
        .subscribe()
    );
  }
}
