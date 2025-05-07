import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
//import { FullCalendarModule } from '@fullcalendar/angular';  // Certifique-se de que isso está aqui
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Schedule } from 'src/app/models/schedule.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [FullCalendarModule]  // Certifique-se de que o FullCalendarModule está importado aqui
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;
  calendarOptions!: CalendarOptions;

  constructor(
    private scheduleService: ScheduleService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: [],
    };

    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.list().subscribe((schedules: Schedule[]) => {
      console.log('Escalas recebidas:', schedules);

      const events: EventInput[] = schedules.map(s => ({
        title: `${s.employeeName ?? 'Sem nome'} (${s.shift_type === 'DAY' ? '🌞' : '🌙'})`,
        date: s.shift_date.split('T')[0],
        color: s.shift_type === 'DAY' ? '#FFEB3B' : '#3F51B5',
        textColor: s.shift_type === 'DAY' ? '#000' : '#FFF',
        allDay: true,
      }));

      const calendarApi = this.calendarComponent.getApi();
      calendarApi.removeAllEvents();
      calendarApi.addEventSource(events);

      this.cdr.detectChanges();
    });
  }

  generateSchedule(): void {
    const today = new Date();
    const year = today.getFullYear();
    const currentMonth = today.getMonth();

    const start_date = new Date(year, currentMonth, 1);
    const end_date = new Date(year, currentMonth + 1, 0);

    const start_date_iso = start_date.toISOString();
    const end_date_iso = end_date.toISOString();

    this.scheduleService.generate(start_date_iso, end_date_iso).subscribe({
      next: () => {
        this.toastr.success('Escala gerada com sucesso!', 'Sucesso');
        this.loadSchedules();
      },
      error: (err) => {
        console.error('Erro ao gerar escala:', err);
        this.toastr.error('Erro ao gerar escala. Verifique o servidor.', 'Erro');
      }
    });
  }

  // Função para apagar todas as escalas
  deleteAllSchedules(): void {
    this.scheduleService.deleteAllSchedules().subscribe({
      next: () => {
        this.toastr.success('Todas as escalas foram apagadas!', 'Sucesso');
        this.loadSchedules();
      },
      error: (err) => {
        console.error('Erro ao apagar escalas:', err);
        this.toastr.error('Erro ao apagar escalas. Verifique o servidor.', 'Erro');
      }
    });
  }
}
