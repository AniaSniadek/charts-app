import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { Country } from 'src/app/_core/models/country.interface';

const COVID_PANDEMIC_START_DATE: string = '2019-11-17';
const DEFAULT_COUNTRY: string = 'poland';
@Component({
  selector: 'one-day-header',
  templateUrl: './one-day-header.component.html',
  styleUrls: ['./one-day-header.component.scss'],
})
export class OneDayHeaderComponent {
  @Input() set countriesListObj(data: Country[]) {
    this.initForm();
    if (data) {
      this.countriesList = data;
      this.onSubmitForm();
    }
  }
  @Output() onFormSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();

  countriesList: Country[];
  form: FormGroup;
  readonly todayDate: Date = new Date();
  readonly covidPandemicStartDate: Date = new Date(COVID_PANDEMIC_START_DATE);

  constructor(private readonly _formBuilder: FormBuilder) {}

  initForm(): void {
    this.form = this._formBuilder.group({
      country: [DEFAULT_COUNTRY, Validators.required],
      date: [this.todayDate, Validators.required],
    });
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const startDate: any = new Date(
        this.form.get('date').value.getTime() - 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0];
      const endDate: string = this.form
        .get('date')
        .value.toISOString()
        .split('T')[0];
      const form: any = {
        country: this.form.get('country').value,
        status: CovidStatus.NONE,
        startDate: startDate,
        endDate: endDate,
        oneDay: true,
      };
      this.onFormSubmitEmitter.emit(form);
    }
  }
}
