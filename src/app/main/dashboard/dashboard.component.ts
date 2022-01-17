import { CovidDataSimple } from './../../_core/models/covid-data-simple.interface';
import { Component, OnInit } from '@angular/core';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { CovidDataService } from 'src/app/_core/services/covid-data.service';
import { forkJoin, Observable } from 'rxjs';
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
  // 'belgium',
  // 'turkey',
  // 'brazil',
];
const DEFAULT_START_DATE: string = '2020-05-01';
const DEFAULT_END_DATE: string = '2020-05-02';
const DEFAULT_DATE: string = '2020-05-01';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  covidData: GraphData.Simple[] = [];
  covidDetailsData: GraphData.Group[] = [];
  showGraph: boolean = false;

  constructor(private readonly _covidDataService: CovidDataService) {}

  ngOnInit(): void {
    // const allCountryObs$: Observable<CovidDataSimple[]> = forkJoin(
    //   ...DEFAULT_COUNTRIES.map((country: string) =>
    //     this._covidDataService.getCovidDataByCountryAndDate(
    //       CovidStatus.NONE,
    //       country,
    //       DEFAULT_START_DATE,
    //       DEFAULT_END_DATE
    //     )
    //   )
    // );
    // allCountryObs$.subscribe((response: CovidDataSimple[]) => {
    //   this.covidData = this.prepareCovidData(response);
    //   this.covidDetailsData = this.prepareCovidDetailsData(response);
    //   this.showGraph = true;
    //   console.log(this.covidData);
    //   console.log(this.covidDetailsData);
    // });
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
      .subscribe();
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
}
