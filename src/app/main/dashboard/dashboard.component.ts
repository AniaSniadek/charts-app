import { Component, OnDestroy, OnInit } from '@angular/core';
import { CovidDataService } from 'src/app/_core/services/covid-data.service';
import { GraphData } from 'src/app/_core/models/graph-data.model';
import { CovidData } from 'src/app/_core/models/covid-data';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CountriesFormModel } from 'src/app/_core/models/countries-form-model.interface';

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
    // this.getCovidDataByDateAndCountry();
  }

  onSubmitFormListener(event: CountriesFormModel): void {
    this.getCovidDataByDateAndCountry(event.date, event.countries);
  }

  getCovidDataByDateAndCountry(date: string, countries: string[]): void {
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
            console.log(response);
            if (response.length) {
              this.covidData = this.prepareCovidData(response);
              this.covidDetailsData = this.prepareCovidDetailsData(response);
              this.showGraph = true;
            } else {
              this.covidData = [];
              this.covidDetailsData = [];
              this.showGraph = false;
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
