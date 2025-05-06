import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';
import { ViewComponent } from './view/view.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importação do FullCalendar
import { CalendarComponent } from 'src/app/features/schedules/calendar/calendar.component'; // CalendarComponent importado
import { MatPaginatorModule } from '@angular/material/paginator'; // Apenas MatPaginatorModule, PageEvent não é necessário aqui

@NgModule({
  declarations: [
    ShiftsComponent, // Declaração do componente principal
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    FullCalendarModule, // Módulo FullCalendar
    CalendarComponent, // Componentes standalone
    ViewComponent,    // Componentes standalone
    MatPaginatorModule, // Módulo de paginação do Angular Material
  ]
})
export class ShiftsModule { }
