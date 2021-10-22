import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CovidStatus } from '../enums/covid-status.enum';
import { CovidDataSimple } from '../models/covid-data-simple.interface';

@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  constructor(private readonly _http: HttpClient) {}

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
    return this._http.get<CovidDataSimple[]>(
      `${environment}/country/${country}/status/${status}${date}`
    );
  }
}
