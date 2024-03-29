import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from './_shared/shared.module';
import { OneDayHeaderComponent } from './headers/one-day-header/one-day-header.component';
import { DateRangeHeaderComponent } from './headers/date-range-header/date-range-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { BarDetailsGraphComponent } from './graphs/bar-details-graph/bar-details-graph.component';
import { DetailsRangeDialogComponent } from './details-range-dialog/details-range-dialog.component';
import { LineRangeGraphComponent } from './graphs/line-range-graph/line-range-graph.component';
import { PieGraphComponent } from './graphs/pie-graph/pie-graph.component';
import { BubbleGraphComponent } from './graphs/bubble-graph/bubble-graph.component';
import { HeatMapGraphComponent } from './graphs/heat-map-graph/heat-map-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    DateRangeHeaderComponent,
    OneDayHeaderComponent,
    DashboardComponent,
    BarGraphComponent,
    BarDetailsGraphComponent,
    DetailsRangeDialogComponent,
    LineRangeGraphComponent,
    PieGraphComponent,
    BubbleGraphComponent,
    HeatMapGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    SharedModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
