import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/core/services/schedule.service';   
import { Schedule } from 'src/app/models/schedule.model';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-shifts',
  standalone: false,
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],

})
export class ShiftsComponent implements OnInit {
  schedules: Schedule[] = [];  // Vai armazenar os turnos
  isLoading = false;  // Para mostrar o status de carregamento
  error: string | null = null;  // Para mostrar mensagens de erro

  // Injeção do serviço ScheduleService para carregar os dados
  constructor(
    private router: Router,
    private route: ActivatedRoute, // ✅ necessário para navegação relativa
    private scheduleService: ScheduleService,
  ) {}

  

  // Quando o componente for inicializado, carrega os turnos
  ngOnInit(): void {
    this.router.navigate(['view'], { relativeTo: this.route }); // Navegação correta
    this.loadSchedules();
  }

  // Método para carregar os turnos
  loadSchedules(): void {
    this.isLoading = true;  // Inicia o carregamento
    this.scheduleService.list().subscribe({
      next: (data) => {
        this.schedules = data;  // Atribui os turnos recebidos
        this.isLoading = false;  // Finaliza o carregamento
      },
      error: (err) => {
        this.error = 'Erro ao carregar os turnos.';  // Caso ocorra um erro
        console.error(err);  // Exibe o erro no console
        this.isLoading = false;  // Finaliza o carregamento mesmo com erro
      }
    });
  }
}
