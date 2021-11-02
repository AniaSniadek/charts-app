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
import { OneDayGraphComponent } from './main/graphs/one-day-graph/one-day-graph.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DateRangeHeaderComponent,
    DateRangeGraphComponent,
    OneDayHeaderComponent,
    OneDayGraphComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PlotlyModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    SharedModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
