import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/_core/models/country.interface';
import { CountriesService } from 'src/app/_core/services/countries.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  countriesList: Country[] = [];
  private _subscription: Subscription = new Subscription();

  constructor(private readonly _coutriesService: CountriesService) {}

  ngOnInit(): void {
    this.getAllCoutriesList();
  }

  getAllCoutriesList(): void {
    this._subscription.add(
      this._coutriesService.getAllCountries().subscribe((value: Country[]) => {
        this.countriesList = value;
      })
    );
  }
}
