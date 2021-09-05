import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { HttpClientModule } from '@angular/common/http';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PlotlyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
