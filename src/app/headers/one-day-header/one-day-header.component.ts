import { SharedService } from '../../_shared/shared.service';
import { CountriesFormModel } from '../../_core/models/countries-form-model.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject, Subscription } from 'rxjs';
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
    this.countriesList = data;
    this.filteredCountries.next(data);
    this.onSubmitForm();
  }
  @Output() onFormSubmitEmitter: EventEmitter<CountriesFormModel> =
    new EventEmitter<CountriesFormModel>();

  countriesList: string[];
  form: FormGroup;
  optionCountrySelected: string;
  filteredCountries: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  filteredCountryControl: FormControl = new FormControl();
  countriesMultiControl: FormControl = new FormControl(
    DEFAULT_COUNTRIES,
    Validators.required
  );
  dateControl: FormControl = new FormControl(
    new Date(DEFAULT_DATE),
    Validators.required
  );

  readonly defaultStartDate: Date = new Date(DEFAULT_START_DATE);
  readonly defaultEndDate: Date = new Date(DEFAULT_END_DATE);

  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _sharedService: SharedService
  ) {
    this.onFormListener();
  }

  onFormListener(): void {
    this._subscription.add(
      this.countriesMultiControl.valueChanges.subscribe((value: string[]) => {
        if (value.length > 5) {
          this._sharedService.openSnackBar(
            'You can select up to 5 countries!',
            'Cancel'
          );
          if (value.includes(this.optionCountrySelected)) {
            const index: number = value.indexOf(this.optionCountrySelected);
            index > -1 && value.splice(index, 1);
            this.countriesMultiControl.setValue(value, { emitEvent: false });
          }
        } else {
          this.onSubmitForm();
        }
      })
    );
    this._subscription.add(
      this.dateControl.valueChanges.subscribe(() => this.onSubmitForm())
    );
    this._subscription.add(
      this.filteredCountryControl.valueChanges.subscribe((value: string) =>
        this.filterCountries(value)
      )
    );
  }

  private filterCountries(search: string) {
    if (!search) {
      this.filteredCountries.next(this.countriesList);
      return;
    }
    this.filteredCountries.next(
      this.countriesList.filter((element: string) =>
        element.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  onSelectionCountriesChange(event: MatOptionSelectionChange): void {
    event.isUserInput && (this.optionCountrySelected = event.source.value);
  }

  onSubmitForm(): void {
    const form: CountriesFormModel = {
      date: moment(this.dateControl.value).format(DATE_FORMAT),
      countries: this.countriesMultiControl.value,
    };
    this.onFormSubmitEmitter.emit(form);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
