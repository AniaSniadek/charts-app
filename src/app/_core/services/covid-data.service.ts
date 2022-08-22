import { CountryPopulation, CovidData } from './../models/covid-data';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const DATA_FILE_PATH: string = 'assets/countries-aggregated_csv.csv';
const POPULATION_FILE_PATH: string = 'assets/population.csv';

@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  constructor(private readonly _http: HttpClient) {}

  getCovidDataFromCsv(): Observable<CovidData[]> {
    return this._http.get(DATA_FILE_PATH, { responseType: 'text' }).pipe(
      switchMap((data: string) => {
        const covidDataArray: CovidData[] = [];
        const csvToRowArray: string[] = data.split('\n');
        for (let index: number = 1; index < csvToRowArray.length - 1; index++) {
          const row: string[] = csvToRowArray[index].split(',');
          const covidData: CovidData = {
            date: row[0],
            country: row[1],
            confirmed: +row[2],
            recovered: +row[3],
            deaths: +row[4],
          };
          covidDataArray.push(covidData);
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
    return this._http.get(DATA_FILE_PATH, { responseType: 'text' }).pipe(
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

  getCountriesPopulationList(): Observable<CountryPopulation[]> {
    return this._http.get(POPULATION_FILE_PATH, { responseType: 'text' }).pipe(
      switchMap((data: string) => {
        const populationArray: CountryPopulation[] = [];
        const csvToRowArray: string[] = data.split('\n');
        for (let index: number = 1; index < csvToRowArray.length - 1; index++) {
          const row: string[] = csvToRowArray[index].split(';');
          const populationData: CountryPopulation = {
            country: row[0],
            population: +row[3]?.replace('\r', ''),
          };
          populationArray.push(populationData);
        }
        return of(populationArray);
      }),
      tap((data: CountryPopulation[]) => data)
    );
  }
}
