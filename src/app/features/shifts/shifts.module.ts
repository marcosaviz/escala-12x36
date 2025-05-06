import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';
import { ViewComponent } from './view/view.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Não precisa mais registrar plugins
import { CalendarComponent } from 'src/app/features/schedules/calendar/calendar.component';

@NgModule({
  declarations: [
    ShiftsComponent,
    
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    FullCalendarModule, // Aqui você já está importando FullCalendar, sem registrar plugins
    CalendarComponent, // standalone
    ViewComponent      // standalone
  ]
})
export class ShiftsModule { }