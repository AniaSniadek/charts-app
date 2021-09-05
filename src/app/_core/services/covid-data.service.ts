import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CovidDataService {
    constructor(private readonly _http: HttpClient){}

    getCovidData(): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
            'x-rapidapi-key':
                  '211439e116msh73ac4041d8935fdp180ef1jsn399e324e6004',
                'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
        })
        return this._http.get('https://covid-19-statistics.p.rapidapi.com/reports/total', { headers })
    }
}