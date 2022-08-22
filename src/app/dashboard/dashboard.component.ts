import { CountryPopulation } from './../_core/models/covid-data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CovidDataService } from 'src/app/_core/services/covid-data.service';
import { GraphData } from 'src/app/_core/models/graph-data.model';
import { CovidData } from 'src/app/_core/models/covid-data';
import { map, tap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CountriesFormModel } from 'src/app/_core/models/countries-form-model.interface';
import { CovidStatus } from '../_core/enums/covid-status.enum';
import { MatTabChangeEvent } from '@angular/material/tabs';

interface ActiveCovidData {
  country: string;
  active: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  covidData: GraphData.Simple[] = [];
  covidDetailsData: GraphData.Group[] = [];
  covidBubbleData: GraphData.Group[] = [];
  countriesList: string[];
  showActiveGraph: boolean = false;
  showAllGraph: boolean = false;
  selectedDate: Date;
  responseData: CovidData[];
  selectedTabIndex: number = 0;
  countriesPopulation: CountryPopulation[];
  private _subscription: Subscription = new Subscription();

  constructor(private readonly _covidDataService: CovidDataService) {}

  ngOnInit(): void {
    this.getCountriesList();
  }

  onTabChanged(event: MatTabChangeEvent): void {
    this.showActiveGraph = false;
    this.showAllGraph = false;
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex === 0) {
      this.covidData = this.prepareCovidData(this.responseData);
      this.showActiveGraph = true;
    } else {
      this.covidDetailsData = this.prepareCovidDetailsData(this.responseData);
      this.covidBubbleData = this.prepareCovidBubbleData(this.responseData);
      this.showAllGraph = true;
    }
  }

  onSubmitFormListener(event: CountriesFormModel): void {
    this.getCovidDataByDateAndCountry(event.date, event.countries);
  }

  getCovidDataByDateAndCountry(date: string, countries: string[]): void {
    this.selectedDate = new Date(date);
    this._subscription.add(
      this._covidDataService
        .getCovidDataFromCsv()
        .pipe(
          map((data: CovidData[]) =>
            data.filter((element: CovidData) => element.date === date)
          ),
          map((data: CovidData[]) =>
            data.filter((element: CovidData) =>
              countries.includes(element.country)
            )
          ),
          tap((response: CovidData[]) => {
            if (response.length) {
              this.responseData = response;
              this.covidData = this.prepareCovidData(response);
              this.covidDetailsData = this.prepareCovidDetailsData(response);
              this.covidBubbleData = this.prepareCovidBubbleData(response);
              this.showActiveGraph = this.selectedTabIndex === 0;
              this.showAllGraph = this.selectedTabIndex === 1;
            } else {
              this.covidData = [];
              this.covidDetailsData = [];
              this.covidBubbleData = [];
              this.showActiveGraph = false;
              this.showAllGraph = false;
            }
          })
        )
        .subscribe()
    );
  }

  getCountriesList(): void {
    this._subscription.add(
      this._covidDataService
        .getCountriesListFromCsv()
        .pipe(
          switchMap((countries: string[]) => {
            this.countriesList = countries;
            return this._covidDataService.getCountriesPopulationList();
          }),
          tap(
            (value: CountryPopulation[]) => (this.countriesPopulation = value)
          )
        )
        .subscribe()
    );
  }

  prepareCovidData(data: CovidData[]): GraphData.Simple[] {
    const dataWithActive: ActiveCovidData[] = data.map((element: CovidData) => {
      return {
        country: element.country,
        active: element.confirmed - element.recovered - element.deaths,
      };
    });
    dataWithActive.sort(
      (a: ActiveCovidData, b: ActiveCovidData) => b.active - a.active
    );
    return dataWithActive.map((element: ActiveCovidData) => ({
      name: element.country,
      value: element.active,
    }));
  }

  prepareCovidDetailsData(data: CovidData[]): GraphData.Group[] {
    data.sort((a: CovidData, b: CovidData) => b.confirmed - a.confirmed);
    return data.map((element: CovidData) => ({
      name: element.country,
      series: [
        {
          name: CovidStatus.CONFIRMED,
          value: element.confirmed,
        },
        {
          name: CovidStatus.RECOVERED,
          value: element.recovered,
        },
        {
          name: CovidStatus.DEATHS,
          value: element.deaths,
        },
      ],
    }));
  }

  prepareCovidBubbleData(data: CovidData[]): GraphData.Group[] {
    data.sort((a: CovidData, b: CovidData) => b.confirmed - a.confirmed);
    const result: GraphData.Group[] = [
      {
        name: CovidStatus.CONFIRMED,
        series: [],
      },
      {
        name: CovidStatus.RECOVERED,
        series: [],
      },
      {
        name: CovidStatus.DEATHS,
        series: [],
      },
    ];
    data.forEach((element: CovidData) => {
      result[0].series.push({
        name: element.country,
        x: element.country,
        y: element.confirmed,
        r: this._getPopulationPercent(element.country, element.confirmed),
      });
      result[1].series.push({
        name: element.country,
        x: element.country,
        y: element.recovered,
        r: this._getPopulationPercent(element.country, element.recovered),
      });
      result[2].series.push({
        name: element.country,
        x: element.country,
        y: element.deaths,
        r: this._getPopulationPercent(element.country, element.deaths),
      });
    });

    return result;
  }

  private _getPopulationPercent(country: string, value: number): number {
    const population: number = this._findPopulation(country);
    return population ? +((value * 100) / population).toFixed(5) : 0;
  }

  private _findPopulation(country: string): number {
    return this.countriesPopulation?.find(
      (element: CountryPopulation) => element.country === country
    )?.population;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
