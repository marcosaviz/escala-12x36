import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // Importando o plugin necessário
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Schedule } from 'src/app/models/schedule.model';



@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [FullCalendarModule], // Certifique-se de que o FullCalendarModule esteja aqui
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
          date: s.date
        }))
      };
    });
  }

  generateSchedule() {
    console.log('Gerando a escala...');
    // Futuramente você pode chamar um endpoint aqui para criar a escala no banco
  }
}








