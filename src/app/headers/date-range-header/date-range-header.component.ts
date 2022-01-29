import { SharedService } from './../../_shared/shared.service';
import { CovidStatus } from './../../_core/enums/covid-status.enum';
import { RangeFormData } from './../../_core/models/range-form-data.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

const DEFAULT_START_DATE: string = '2020-01-01';
const DEFAULT_END_DATE: string = '2020-12-31';

@Component({
  selector: 'date-range-header',
  templateUrl: './date-range-header.component.html',
  styleUrls: ['./date-range-header.component.scss'],
})
export class DateRangeHeaderComponent implements OnDestroy {
  @Input() countriesList: string[];
  @Input() set formData(data: RangeFormData) {
    this.initForm(data);
    this.data = data;
  }

  @Output() onFormSubmitEmitter: EventEmitter<RangeFormData> =
    new EventEmitter<RangeFormData>();

  form: FormGroup;
  data: RangeFormData;
  statusList: CovidStatus[] = Object.values(CovidStatus);

  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _sharedService: SharedService
  ) {}

  initForm(data: RangeFormData): void {
    this.form = this._formBuilder.group({
      startDate: [data?.startDate, Validators.required],
      endDate: [data?.endDate, Validators.required],
      statusList: [data?.statusList, Validators.required],
      country: [data?.country, Validators.required],
    });
    this.onFormSubmitEmitter.next({
      startDate: this.form.get('startDate').value,
      endDate: this.form.get('endDate').value,
      country: this.form.get('country').value,
      statusList: this.form.get('statusList').value,
    });
    this.formChangeListener();
  }

  formChangeListener(): void {
    this._subscription.add(
      this.form
        .get('statusList')
        .valueChanges.subscribe((value: CovidStatus[]) => {
          if (value.length === 0) {
            this.onFormSubmitEmitter.next(null);
            this._sharedService.openSnackBar(
              'Please choose a status!',
              'Cancel'
            );
          } else {
            this.onFormSubmitEmitter.next({
              startDate: this.form.get('startDate').value,
              endDate: this.form.get('endDate').value,
              country: this.form.get('country').value,
              statusList: value,
            });
          }
        })
    );
    this._subscription.add(
      this.form.get('country').valueChanges.subscribe((value: string) => {
        this.onFormSubmitEmitter.next({
          startDate: this.form.get('startDate').value,
          endDate: this.form.get('endDate').value,
          country: value,
          statusList: this.form.get('statusList').value,
        });
      })
    );
    this._subscription.add(
      this.form.get('endDate').valueChanges.subscribe((value: Date) => {
        if (this.form.get('startDate').value && value) {
          this.onFormSubmitEmitter.next({
            startDate: this.form.get('startDate').value,
            endDate: value,
            country: this.form.get('country').value,
            statusList: this.form.get('statusList').value,
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
