import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DayOffService } from 'src/app/core/services/dayoff.service';
import { DayOff } from 'src/app/models/dayoff.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensagens de feedback

@Component({
  standalone: true,
  selector: 'app-dayoff-list',
  templateUrl: './list.component.html',
  imports: [MatTableModule, RouterModule, CommonModule],
})
export class ListComponent implements OnInit {
  dayOffs: DayOff[] = [];

  constructor(
    private dayOffService: DayOffService,
    private snackBar: MatSnackBar, // Para feedback ao editar
    private router: Router // Injete o serviço de roteamento
  ) {}

  


  ngOnInit(): void {
    this.loadDayOffs();
  }

  loadDayOffs() {
    this.dayOffService.list().subscribe(data => {
      this.dayOffs = data;
    });
  }

  deleteDayOff(id: number) {
    if (confirm('Tem certeza que deseja excluir esta folga?')) {
      this.dayOffService.delete(id).subscribe({
         next: () => {
          this.loadDayOffs();
          this.snackBar.open('Folga excluída com sucesso!', 'Fechar', { duration: 3000 });
         },
         error: (err) => {
          console.error('Erro ao excluir folga:', err);
          this.snackBar.open('Erro ao excluir folga', 'Fechar', { duration: 3000 });
        }
    });
  }
}
  // Método edit adicionado
  editDayOff(id: number) {
    console.log('Editando folga com ID:', id);
    this.router.navigate(['/dayoffs/edit', id]); 
    this.snackBar.open('Editando folga...', 'Fechar', { duration: 3000 });
  }
}
