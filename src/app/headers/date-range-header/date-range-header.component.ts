import { RangeFormData } from './../../_core/models/range-form-data.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() set formData(data: RangeFormData) {
    data && this.initForm(data);
  }
  @Output() onFormSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);

  constructor(private readonly _formBuilder: FormBuilder) {}

  initForm(data: RangeFormData): void {
    this.form = this._formBuilder.group({
      startDate: [data.startDate, Validators.required],
      endDate: [data.endDate, Validators.required],
    });
  }
  onSubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
