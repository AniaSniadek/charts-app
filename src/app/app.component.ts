import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // dataGraph: any = null;
  // getCovidData(): void {
  //   this._covidDataService.getCovidData().subscribe((data: any) => {
  //     const names: any[] = [];
  //     const values: any[] = [];
  //     for (const [key, value] of Object.entries(data.data)) {
  //       if (
  //         key !== 'date' &&
  //         !key.includes('diff') &&
  //         key !== 'last_update' &&
  //         key !== 'fatality_rate'
  //       ) {
  //         names.push(key);
  //         values.push(value);
  //       }
  //     }
  //     this.createGraph(names, values);
  //   });
  // }
}
