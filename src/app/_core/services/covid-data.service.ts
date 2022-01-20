import { CovidData } from './../models/covid-data';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const CSV_FILE_PATH: string = 'assets/countries-aggregated_csv.csv';

@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  constructor(private readonly _http: HttpClient) {}

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
        return of(countries);
      }),
      tap((data: string[]) => data)
    );
  }
}
