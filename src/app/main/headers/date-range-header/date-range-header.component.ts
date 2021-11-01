import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovidStatus } from 'src/app/_core/enums/covid-status.enum';
import { Country } from 'src/app/_core/models/country.interface';
import * as moment from 'moment';

const COVID_PANDEMIC_START_DATE: string = '2019-11-17';
const DEFAULT_COUNTRY: string = 'poland';
const DATE_FORMAT: string = 'YYYY-MM-DD';
@Component({
  selector: 'date-range-header',
  templateUrl: './date-range-header.component.html',
  styleUrls: ['./date-range-header.component.scss'],
})
export class DateRangeHeaderComponent {
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
  covidStatusArray: string[] = Object.values(CovidStatus);
  readonly todayDate: Date = new Date();
  readonly covidPandemicStartDate: Date = new Date(COVID_PANDEMIC_START_DATE);

  constructor(private readonly _formBuilder: FormBuilder) {}

  initForm(): void {
    this.form = this._formBuilder.group({
      country: [DEFAULT_COUNTRY, Validators.required],
      status: [CovidStatus.CONFIRMED, Validators.required],
      startDate: [null],
      endDate: [null],
    });
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const startDate: string = this.form.get('startDate').value
        ? moment(this.form.get('startDate').value).format(DATE_FORMAT)
        : null;
      const endDate: string = this.form.get('endDate').value
        ? moment(this.form.get('endDate').value).format(DATE_FORMAT)
        : null;
      const form: any = {
        country: this.form.get('country').value,
        status: this.form.get('status').value,
        startDate,
        endDate,
        ondDay: false,
      };
      this.onFormSubmitEmitter.emit(form);
    }
  }
}
