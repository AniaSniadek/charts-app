import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-range-dialog',
  templateUrl: './details-range-dialog.component.html',
  styleUrls: ['./details-range-dialog.component.scss'],
})
export class DetailsRangeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailsRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {}
}
