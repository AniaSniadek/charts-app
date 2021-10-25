import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from '../_core/models/country.interface';
import { CovidDataSimple } from '../_core/models/covid-data-simple.interface';
import { CountriesService } from '../_core/services/countries.service';
import { CovidDataService } from '../_core/services/covid-data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  covidData: CovidDataSimple[];
  countriesList: Country[];
  showGraph: boolean = false;
  noStatus: boolean = false;
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _covidDataService: CovidDataService,
    private readonly _coutriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.getAllCoutriesList();
  }

  getAllCoutriesList(): void {
    this._subscription.add(
      this._coutriesService
        .getAllCountries()
        .subscribe((value: Country[]) => (this.countriesList = value))
    );
  }

  submitFormListener(event: any): void {
    this.noStatus = event.status === 'none' ? true : false;
    this._subscription.add(
      this._covidDataService
        .getCovidDataByCountryAndDate(
          event.status,
          event.country,
          event.startDate,
          event.endDate
        )
        .subscribe((value: CovidDataSimple[]) => {
          this.covidData = value;
          console.log(this.covidData);
          this.showGraph = true;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
