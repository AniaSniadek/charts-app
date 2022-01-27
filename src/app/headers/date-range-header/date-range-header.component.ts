import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

const DEFAULT_START_DATE: string = '2020-01-01';
const DEFAULT_END_DATE: string = '2020-12-31';
const DATE_FORMAT: string = 'YYYY-MM-DD';

@Component({
  selector: 'date-range-header',
  templateUrl: './date-range-header.component.html',
  styleUrls: ['./date-range-header.component.scss'],
})
export class DateRangeHeaderComponent {
  @Output() onFormSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);

  constructor(private readonly _formBuilder: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
    this.form = this._formBuilder.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }
  onSubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
