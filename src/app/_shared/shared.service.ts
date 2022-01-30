import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

const DEFAULT_SNACKBAR_DURATION: number = 3000;
const DEFAULT_SNACKBAR_POSITION: MatSnackBarVerticalPosition = 'top';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: DEFAULT_SNACKBAR_DURATION,
      verticalPosition: DEFAULT_SNACKBAR_POSITION,
    });
  }
}
