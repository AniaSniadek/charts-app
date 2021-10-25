import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
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
    endDate: string,
    oneDay: boolean
  ): Observable<CovidDataSimple[]> {
    const date: string =
      startDate && endDate
        ? `?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
        : '';
    status === 'none' && (status = null);
    return this._http.get<CovidDataSimple[]>(
      `${environment.apiUrl}${oneDay ? '/live' : ''}${
        date ? '' : '/dayone'
      }/country/${country}${oneDay ? '/status/confirmed' : ''}${
        status ? '/status/' + status : ''
      }${date}`
    );
  }
}
