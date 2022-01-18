import { CountryData } from './../../_core/models/country-data';
import { CovidDataSimple } from './../../_core/models/covid-data-simple.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { CovidDataService } from 'src/app/_core/services/covid-data.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { GraphData } from 'src/app/_core/models/graph-data.model';
import { element } from 'protractor';
import { CovidData } from 'src/app/_core/models/covid-data';
import { map, tap } from 'rxjs/operators';

const DEFAULT_COUNTRIES: string[] = [
  'Russia',
  'Ukraine',
  'Germany',
  'Poland',
  'Italy',
  'Spain',
];
const DEFAULT_DATE: string = '2020-05-01';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  covidData: GraphData.Simple[] = [];
  covidDetailsData: GraphData.Group[] = [];
  countriesList: string[];
  showGraph: boolean = false;
  private _subscription: Subscription = new Subscription();

  constructor(private readonly _covidDataService: CovidDataService) {}

  ngOnInit(): void {
    this.getCountriesList();
    this.getCovidDataByDateAndCountry();
  }

  getCovidDataByDateAndCountry(): void {
    this._subscription.add(
      this._covidDataService
        .getCovidDataFromCsv()
        .pipe(
          map((data: CovidData[]) =>
            data.filter((element: CovidData) => element.date === DEFAULT_DATE)
          ),
          map((data: CovidData[]) =>
            data.filter((element: CovidData) =>
              DEFAULT_COUNTRIES.includes(element.country)
            )
          ),
          tap((response: CovidData[]) => {
            console.log(response);
            this.covidData = this.prepareCovidData(response);
            this.covidDetailsData = this.prepareCovidDetailsData(response);
            this.showGraph = true;
          })
        )
        .subscribe()
    );
  }

  getCountriesList(): void {
    this._subscription.add(
      this._covidDataService
        .getCountriesListFromCsv()
        .pipe(tap((countries: string[]) => (this.countriesList = countries)))
        .subscribe()
    );
  }

  prepareCovidData(data: CovidData[]): GraphData.Simple[] {
    data.sort((a: CovidData, b: CovidData) => b.confirmed - a.confirmed);
    return data.map((element: CovidData) => ({
      name: element.country,
      value: element.confirmed,
    }));
  }

  prepareCovidDetailsData(data: CovidData[]): GraphData.Group[] {
    data.sort((a: CovidData, b: CovidData) => b.confirmed - a.confirmed);
    return data.map((element: CovidData) => ({
      name: element.country,
      series: [
        {
          name: 'Confirmed',
          value: element.confirmed,
        },
        // {
        //   name: 'Active',
        //   value: element.Active,
        // },
        {
          name: 'Deaths',
          value: element.deaths,
        },
        {
          name: 'Recovered',
          value: element.recovered,
        },
      ],
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
