import { Component, OnInit, NgModule } from '@angular/core';
import { ScheduleService } from 'src/app/core/services/schedule.service';   
import { Schedule } from 'src/app/models/schedule.model';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  imports: [CommonModule]  // 🔥 necessário para pipes como 'date'

})
export class ViewComponent implements OnInit {
  schedules: Schedule[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.isLoading = true;
    this.scheduleService.list().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data); // <-- Adicione isso
        this.schedules = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os turnos.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
