import { Country } from './../models/country.interface';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private readonly _http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${environment.apiUrl}/countries`);
  }
}
