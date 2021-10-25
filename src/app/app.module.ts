import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from './_shared/shared.module';
import { DateRangeGraphComponent } from './main/graphs/date-range-graph/date-range-graph.component';
import { OneDayHeaderComponent } from './main/headers/one-day-header/one-day-header.component';
import { DateRangeHeaderComponent } from './main/headers/date-range-header/date-range-header.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DateRangeHeaderComponent,
    DateRangeGraphComponent,
    OneDayHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PlotlyModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
