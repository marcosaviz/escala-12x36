import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // Importando o plugin necessário
import { ScheduleService } from 'src/app/core/services/schedule.service';


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
      console.log('Escalas recebidas:', schedules); //👈 Verifique se os dados estão corretos
      
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin], // Registre os plugins aqui
        events: schedules.map(s => ({
          title: `${s.employeeName} (${s.shift_type === 'DAY' ? 'Dia' : 'Noite'})`,
          date: s.shift_date.split('T')[0],
          //date: new Date(s.shift_date).toISOString().split('T')[0], // Converte para 'YYYY-MM-DD' no formato ISO
          color: s.shift_type === 'DAY' ? '#FFEB3B' : '#3F51B5', // Amarelo para diurno, Azul para noturno
          textColor: s.shift_type === 'DAY' ? '#000' : '#FFF', // Preto para diurno, branco para noturno
        
        }))
      };
    });
  }

  generateSchedule() {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() retorna 0 a 11
    const year = today.getFullYear();

    // Calculando o primeiro dia e o último dia do mês
  const start_date = new Date(year, month, 1); // Primeiro dia do mês
  const end_date = new Date(year, month + 1, 0); // Último dia do mês (mês + 1, dia 0)


  // Convertendo as datas para o formato ISO (string)
  const start_date_iso = start_date.toISOString(); // Ex: '2025-06-01T00:00:00.000Z'
  const end_date_iso = end_date.toISOString(); // Ex: '2025-06-30T23:59:59.999Z'

    // Convertendo as datas para o formato ISO (string)
  this.scheduleService.generate(start_date_iso, end_date_iso).subscribe({
      next: () => {
        alert('Escala gerada coms sucesso!');
        this.loadSchedules(); //recarrega os eventos no calendario 
      },
      error: (err) => {
        console.error('Erro ao gerar escala:' , err);
        alert('Erro ao gerar escala. Verifique o servidor.');
      }
    });
  }
}








