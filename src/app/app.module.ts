import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PlotlyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
