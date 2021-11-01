import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { Country } from 'src/app/_core/models/country.interface';
import * as moment from 'moment';

const COVID_PANDEMIC_START_DATE: string = '2019-11-17';
const DEFAULT_COUNTRY: string = 'poland';
const DATE_FORMAT: string = 'YYYY-MM-DD';
const DEFAULT_START_DATE: string = '2021-01-01';
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
      date: [new Date(DEFAULT_START_DATE), Validators.required],
    });
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const startDate: string = moment(this.form.get('date').value)
        .subtract(1, 'days')
        .startOf('day')
        .format(DATE_FORMAT);
      const endDate: string = moment(this.form.get('date').value).format(
        DATE_FORMAT
      );
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
