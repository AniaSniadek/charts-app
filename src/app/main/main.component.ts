import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../_core/models/country.interface';
import { CovidDataSimple } from '../_core/models/covid-data-simple.interface';
import { CountriesService } from '../_core/services/countries.service';
import { CovidDataService } from '../_core/services/covid-data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  countriesList: Country[];
  covidDateRangeData: CovidDataSimple[];
  showDateRangeGraph: boolean = false;
  covidOneDayData: CovidDataSimple;
  showOneDayGraph: boolean = false;
  noStatus: boolean = false;
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _covidDataService: CovidDataService,
    private readonly _coutriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.getAllCoutriesList();
  }

  getAllCoutriesList(): void {
    this._subscription.add(
      this._coutriesService
        .getAllCountries()
        .subscribe((value: Country[]) => (this.countriesList = value))
    );
  }

  submitFormListener(event: any): void {
    !event.oneDay && (this.noStatus = event.status === 'none' ? true : false);
    this._subscription.add(
      event.oneDay
        ? this.getCovidOneDayData(event).subscribe()
        : this.getCovidDateRangeData(event).subscribe()
    );
  }

  getCovidDateRangeData(event: any): Observable<CovidDataSimple[]> {
    return this._covidDataService
      .getCovidDataByCountryAndDate(
        event.status,
        event.country,
        event.startDate,
        event.endDate,
        event.oneDay
      )
      .pipe(
        tap((value: CovidDataSimple[]) => {
          this.covidDateRangeData = value;
          console.log(this.covidDateRangeData);
          this.showDateRangeGraph = true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          throw throwError;
        })
      );
  }

  getCovidOneDayData(event: any): Observable<CovidDataSimple[]> {
    return this._covidDataService
      .getCovidDataByCountryAndDate(
        event.status,
        event.country,
        event.startDate,
        event.endDate,
        event.oneDay
      )
      .pipe(
        tap((value: CovidDataSimple[]) => {
          this.covidOneDayData = value[1];
          console.log(this.covidOneDayData);
          this.showOneDayGraph = true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          throw throwError;
        })
      );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
