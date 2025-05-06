import { Component, OnInit, NgModule } from '@angular/core';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Schedule } from 'src/app/models/schedule.model';
import { CommonModule } from '@angular/common';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';












@Component({
  standalone: true,
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  imports: [
    CommonModule,
    MatPaginatorModule
  ]  // 🔥 necessário para pipes como 'date'
})
export class ViewComponent implements OnInit {
  schedules: Schedule[] = [];
  isLoading = false;
  error: string | null = null;
  currentPage = 0;
  pageSize = 5;

  // Método para retornar os turnos paginados
  get paginatedSchedules(): Schedule[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.schedules.slice(startIndex, startIndex + this.pageSize);
  }



  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  // Carrega os turnos
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

  // Quando a página muda
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

