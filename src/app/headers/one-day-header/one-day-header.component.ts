import { SharedService } from '../../_shared/shared.service';
import { CountriesFormModel } from '../../_core/models/countries-form-model.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';

const DEFAULT_START_DATE: string = '2020-01-01';
const DEFAULT_END_DATE: string = '2020-12-31';
const DEFAULT_COUNTRIES: string[] = [
  'Russia',
  'Germany',
  'Poland',
  'Italy',
  'Spain',
];
const DEFAULT_DATE: string = '2020-05-01';
const DATE_FORMAT: string = 'YYYY-MM-DD';

@Component({
  selector: 'one-day-header',
  templateUrl: './one-day-header.component.html',
  styleUrls: ['./one-day-header.component.scss'],
})
export class OneDayHeaderComponent implements OnDestroy {
  @Input() set countriesListObj(data: string[]) {
    this.initForm();
    if (data) {
      this.countriesList = data;
      this.onSubmitForm();
    }
  }
  @Output() onFormSubmitEmitter: EventEmitter<CountriesFormModel> =
    new EventEmitter<CountriesFormModel>();

  countriesList: string[];
  form: FormGroup;
  selectedCountriesList: string[] = DEFAULT_COUNTRIES;
  optionCountrySelected: string;
  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _sharedService: SharedService
  ) {}

  initForm(): void {
    this.form = this._formBuilder.group({
      countries: [DEFAULT_COUNTRIES, Validators.required],
      date: [new Date(DEFAULT_DATE), Validators.required],
    });
    this.onFormListener();
  }

  onFormListener(): void {
    this._subscription.add(
      this.form.valueChanges.subscribe((value: CountriesFormModel) => {
        value.countries.length === 0 &&
          this._sharedService.openSnackBar(
            'Please select at least 1 country!',
            'Cancel'
          );
        if (value.countries.length > 5) {
          this._sharedService.openSnackBar(
            'You can select up to 5 countries!',
            'Cancel'
          );
          const countries: string[] = value.countries;
          if (countries.includes(this.optionCountrySelected)) {
            const index: number = countries.indexOf(this.optionCountrySelected);
            index > -1 && countries.splice(index, 1);
            this.form
              .get('countries')
              .setValue(countries, { emitEvent: false });
          }
        } else {
          this.onSubmitForm();
        }
      })
    );
  }

  onSelectionCountriesChange(event: MatOptionSelectionChange): void {
    event.isUserInput && (this.optionCountrySelected = event.source.value);
  }

  onSubmitForm(): void {
    const form: CountriesFormModel = {
      date: moment(this.form.get('date').value).format(DATE_FORMAT),
      countries: this.form.get('countries').value,
    };
    this.onFormSubmitEmitter.emit(form);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
