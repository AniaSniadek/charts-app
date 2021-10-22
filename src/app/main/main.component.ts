import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidStatus } from '../_core/enums/covid-status.enum';
import { CovidDataSimple } from '../_core/models/covid-data-simple.interface';
import { CovidDataService } from '../_core/services/covid-data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  covidData: CovidDataSimple[];
  showGraph: boolean = false;
  readonly covidStatus: typeof CovidStatus = CovidStatus;
  private _subscription: Subscription = new Subscription();

  constructor(private readonly _covidDataService: CovidDataService) {}

  submitFormListener(event: any): void {
    this._subscription.add(
      this._covidDataService
        .getCovidDataByCountryAndDate(
          this.covidStatus.CONFIRMED,
          event.country,
          event.startDate,
          event.endDate
        )
        .subscribe((value: CovidDataSimple[]) => {
          console.log(value);
          this.covidData = value;
          this.showGraph = true;
        })
    );
  }
}
