import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // Importando o plugin necessário
import { ScheduleService } from 'src/app/core/services/schedule.service';

import { Schedule } from 'src/app/models/schedule.model';



@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [FullCalendarModule] // Certifique-se de que o FullCalendarModule esteja aqui
})

export class CalendarComponent implements OnInit {
  calendarOptions!: CalendarOptions;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {
    this.scheduleService.list().subscribe(schedules => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin], // Registre os plugins aqui
        events: schedules.map(s => ({
          title: `${s.employeeName} (${s.shift === 'DAY' ? 'Dia' : 'Noite'})`,
          date: s.date,
          color: s.shift === 'DAY' ? '#FFEB3B' : '#3F51B5', // Amarelo para diurno, Azul para noturno
          textColor: s.shift === 'DAY' ? '#000' : '#FFF', // Preto para diurno, branco para noturno
        
        }))
      };
    });
  }

  generateSchedule() {
    console.log('Gerando a escala...');
    // Futuramente você pode chamar um endpoint aqui para criar a escala no banco
  }
}








