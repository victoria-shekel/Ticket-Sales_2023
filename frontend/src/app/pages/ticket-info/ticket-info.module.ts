import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketInfoRoutingModule } from './ticket-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TicketsModule} from "../tickets/tickets.module";
import { PopupComponent } from './ticket-item/popup/popup.component';


@NgModule({
  declarations: [
    TicketItemComponent,
    PopupComponent
  ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      InputTextModule,
      InputNumberModule,
      CalendarModule,
      TicketInfoRoutingModule,
      TicketsModule,
      FormsModule
    ]
})
export class TicketInfoModule { }
