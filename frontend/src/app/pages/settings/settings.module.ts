import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';
import {TourLoaderService } from '../../services/tour-loader.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChangePasswordComponent } from './change-password';


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticsComponent,
    TourLoaderComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
  ],
  providers:[
    TourLoaderService,
  ]

})
export class SettingsModule { }


