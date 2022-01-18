import { CountryData } from './../models/country-data';
import { CovidData } from './../models/covid-data';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CovidStatus } from '../enums/covid-status.enum';
import { CovidDataSimple } from '../models/covid-data-simple.interface';

const CSV_FILE_PATH: string = 'assets/countries-aggregated_csv.csv';

@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  constructor(private readonly _http: HttpClient) {
    // this.getCovidDataFromCsv()
    //   .pipe(
    //     map((value: CovidData[]) =>
    //       value.filter((element: CovidData) => element.country === 'Poland')
    //     )
    //   )
    //   .subscribe((value: any) => console.log(value));
    // this.getCountriesListFromCsv().subscribe((value: any) =>
    //   console.log(value)
    // );
  }

  getCovidDataFromCsv(): Observable<CovidData[]> {
    return this._http.get(CSV_FILE_PATH, { responseType: 'text' }).pipe(
      switchMap((data: string) => {
        const covidDataArray: CovidData[] = [];
        const csvToRowArray: string[] = data.split('\n');
        for (let index: number = 1; index < csvToRowArray.length - 1; index++) {
          const row: string[] = csvToRowArray[index].split(',');
          covidDataArray.push(
            new CovidData(row[0], row[1], +row[2], +row[3], +row[4])
          );
        }
        return of(covidDataArray);
      }),
      map((data: CovidData[]) =>
        data.filter((element: CovidData) => element.date.includes('2020'))
      ),
      tap((data: CovidData[]) => data)
    );
  }

  getCountriesListFromCsv(): Observable<string[]> {
    return this._http.get(CSV_FILE_PATH, { responseType: 'text' }).pipe(
      switchMap((data: string) => {
        let countries: string[] = [];
        const csvToRowArray: string[] = data.split('\n');
        for (let index: number = 1; index < csvToRowArray.length - 1; index++) {
          const row: string[] = csvToRowArray[index].split(',');
          countries.push(row[1]);
        }
        countries = [...new Set(countries)];
        // const countryDataArray: CountryData[] = countries.map(
        //   (element: string) => new CountryData(element)
        // );
        return of(countries);
      }),
      tap((data: string[]) => data)
    );
  }

  getCovidDataByCountryAndDate(
    status: CovidStatus,
    country: string,
    startDate: string,
    endDate: string
  ): Observable<CovidDataSimple[]> {
    const date: string =
      startDate && endDate
        ? `?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
        : '';
    status === 'none' && (status = null);
    return this._http
      .get<CovidDataSimple[]>(
        `${environment.apiUrl}${date ? '' : '/dayone'}/country/${country}${
          status ? '/status/' + status : ''
        }${date}`
      )
      .pipe(map((response: any) => (status ? response : response[0])));
  }
}
