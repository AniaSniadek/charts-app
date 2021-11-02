import { CovidDataSimple } from './../../_core/models/covid-data-simple.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { Country } from 'src/app/_core/models/country.interface';
import { CovidDataService } from 'src/app/_core/services/covid-data.service';
import { forkJoin, Observable } from 'rxjs';

const DEFAULT_COUNTRIES: string[] = [
  'russia',
  'ukraine',
  'germany',
  'poland',
  'italy',
  'spain',
  // 'belgium',
  // 'turkey',
  // 'brazil',
];
const DEFAULT_START_DATE: string = '2020-05-01';
const DEFAULT_END_DATE: string = '2020-05-02';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  covidData: { name: string; value: number }[] = [];
  covidDetailsData: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];
  showGraph: boolean = false;

  constructor(private readonly _covidDataService: CovidDataService) {}

  ngOnInit(): void {
    const allCountryObs$: Observable<CovidDataSimple[]> = forkJoin(
      ...DEFAULT_COUNTRIES.map((country: string) =>
        this._covidDataService.getCovidDataByCountryAndDate(
          CovidStatus.NONE,
          country,
          DEFAULT_START_DATE,
          DEFAULT_END_DATE
        )
      )
    );
    allCountryObs$.subscribe((response: CovidDataSimple[]) => {
      response.forEach((element: CovidDataSimple) => {
        this.covidData.push({
          name: element.Country,
          value: element.Active,
        });
        this.covidDetailsData.push({
          name: element.Country,
          series: [
            {
              name: 'Confirmed',
              value: element.Confirmed,
            },
            {
              name: 'Active',
              value: element.Active,
            },
            {
              name: 'Deaths',
              value: element.Deaths,
            },
            {
              name: 'Recovered',
              value: element.Recovered,
            },
          ],
        });
      });
      this.covidData.sort((a: any, b: any) => b.value - a.value);
      this.showGraph = true;
      console.log(this.covidData);
      console.log(this.covidDetailsData);
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
