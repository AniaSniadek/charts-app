import { RangeFormData } from './../../_core/models/range-form-data.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const DEFAULT_START_DATE: string = '2020-01-01';
const DEFAULT_END_DATE: string = '2020-12-31';

@Component({
  selector: 'date-range-header',
  templateUrl: './date-range-header.component.html',
  styleUrls: ['./date-range-header.component.scss'],
})
export class DateRangeHeaderComponent {
  @Input() set formData(data: RangeFormData) {
    this.initForm(data);
    this.data = data;
  }
  @Output() onFormSubmitEmitter: EventEmitter<RangeFormData> =
    new EventEmitter<RangeFormData>();

  form: FormGroup;
  data: RangeFormData;

  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);

  constructor(private readonly _formBuilder: FormBuilder) {}

  initForm(data: RangeFormData): void {
    this.form = this._formBuilder.group({
      startDate: [data?.startDate, Validators.required],
      endDate: [data?.endDate, Validators.required],
    });
  }

  dateRangeChange(start: HTMLInputElement, end: HTMLInputElement) {
    if (start.value && end.value) {
      const startDate: string = start.value
        .replace(new RegExp('/', 'g'), '-')
        .replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3');
      const endDate: string = end.value
        .replace(new RegExp('/', 'g'), '-')
        .replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3');
      this.onFormSubmitEmitter.next({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        country: this.data.country,
        status: this.data.status,
      });
    }
  }
}
