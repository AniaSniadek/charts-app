import { CovidDataSimple } from './../../_core/models/covid-data-simple.interface';
import { Component, OnInit } from '@angular/core';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { CovidDataService } from 'src/app/_core/services/covid-data.service';
import { forkJoin, Observable } from 'rxjs';
import { GraphData } from 'src/app/_core/models/graph-data.model';

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
  covidData: GraphData.Simple[] = [];
  covidDetailsData: GraphData.Group[] = [];
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
      this.covidData = this.prepareCovidData(response);
      this.covidDetailsData = this.prepareCovidDetailsData(response);
      this.showGraph = true;
      console.log(this.covidData);
      console.log(this.covidDetailsData);
    });
  }

  prepareCovidData(data: CovidDataSimple[]): GraphData.Simple[] {
    data.sort((a: CovidDataSimple, b: CovidDataSimple) => b.Active - a.Active);
    return data.map((element: CovidDataSimple) => ({
      name: element.Country,
      value: element.Active,
    }));
  }

  prepareCovidDetailsData(data: CovidDataSimple[]): GraphData.Group[] {
    data.sort(
      (a: CovidDataSimple, b: CovidDataSimple) => b.Confirmed - a.Confirmed
    );
    return data.map((element: CovidDataSimple) => ({
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
    }));
  }
}
