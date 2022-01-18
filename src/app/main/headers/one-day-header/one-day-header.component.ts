import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const DEFAULT_START_DATE: string = '2020-01-01';
const DEFAULT_END_DATE: string = '2020-12-31';
const DEFAULT_COUNTRIES: string[] = [
  'Russia',
  'Ukraine',
  'Germany',
  'Poland',
  'Italy',
  'Spain',
];
const DEFAULT_DATE: string = '2020-05-01';

@Component({
  selector: 'one-day-header',
  templateUrl: './one-day-header.component.html',
  styleUrls: ['./one-day-header.component.scss'],
})
export class OneDayHeaderComponent {
  @Input() set countriesListObj(data: string[]) {
    this.initForm();
    if (data) {
      this.countriesList = data;
      // this.onSubmitForm();
    }
  }
  @Output() onFormSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();

  countriesList: string[];
  form: FormGroup;
  selectedCountriesList: string[] = DEFAULT_COUNTRIES;
  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);

  constructor(private readonly _formBuilder: FormBuilder) {}

  initForm(): void {
    this.form = this._formBuilder.group({
      countries: [DEFAULT_COUNTRIES, Validators.required],
      date: [new Date(DEFAULT_DATE), Validators.required],
    });
  }

  onCountrySelectionChange(event): void {
    console.log(event);
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // const form: any = {
      //   country: this.form.get('country').value,
      //   date: moment(this.form.get('date').value).format(DATE_FORMAT),
      // };
      // this.onFormSubmitEmitter.emit(form);
    }
  }
}
