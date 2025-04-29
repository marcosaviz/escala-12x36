import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './schedules.component';
import { CalendarComponent } from 'src/app/features/schedules/calendar/calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular'; // Importe o FullCalendarModule




@NgModule({
  declarations: [
    SchedulesComponent,
    
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    CalendarComponent,
    FullCalendarModule
  ]
})
export class SchedulesModule { }
