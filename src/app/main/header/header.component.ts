import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { Country } from 'src/app/_core/models/country.interface';
import { CountriesService } from 'src/app/_core/services/countries.service';

const COVID_PANDEMIC_START_DATE: string = '2019-11-17';
const DEFAULT_COUNTRY: string = 'poland';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onFormSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();

  countriesList: Country[] = [];
  form: FormGroup;
  covidStatusArray: string[] = Object.values(CovidStatus);
  readonly todayDate: Date = new Date();
  readonly covidPandemicStartDate: Date = new Date(COVID_PANDEMIC_START_DATE);
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _coutriesService: CountriesService,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      country: [DEFAULT_COUNTRY, Validators.required],
      status: [CovidStatus.CONFIRMED, Validators.required],
      startDate: [null],
      endDate: [null],
    });
    this.getAllCoutriesList();
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const startDate: string = this.form.get('startDate').value
        ? this.form.get('startDate').value.toISOString().split('T')[0]
        : null;
      const endDate: string = this.form.get('endDate').value
        ? this.form.get('endDate').value.toISOString().split('T')[0]
        : null;
      const form: any = {
        country: this.form.get('country').value,
        status: this.form.get('status').value,
        startDate,
        endDate,
      };
      this.onFormSubmitEmitter.emit(form);
    }
  }

  getAllCoutriesList(): void {
    this._subscription.add(
      this._coutriesService.getAllCountries().subscribe((value: Country[]) => {
        this.countriesList = value;
        this.onSubmitForm();
      })
    );
  }
}
