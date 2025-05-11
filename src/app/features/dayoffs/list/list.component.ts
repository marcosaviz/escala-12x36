import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DayOffService } from 'src/app/core/services/dayoff.service';
import { DayOff } from 'src/app/models/dayoff.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensagens de feedback
import { Employee } from 'src/app/models/employee.model'; // Importe o modelo de funcionário

@Component({
  standalone: true,
  selector: 'app-dayoff-list',
  templateUrl: './list.component.html',
  imports: [MatTableModule, RouterModule, CommonModule],
})
export class ListComponent implements OnInit {
  dayOffs: DayOff[] = [];
  employees: Employee[] = []; // Armazenar a lista de funcionários

  constructor(
    private dayOffService: DayOffService,
    private employeeService: EmployeeService, // Serviço de funcionários
    private snackBar: MatSnackBar, // Feedback ao usuário
    private router: Router // Navegação
  ) {}

  ngOnInit(): void {
    this.loadDayOffs();
    this.loadEmployees();
  }

  // Método para carregar as folgas
  loadDayOffs() {
    this.dayOffService.list().subscribe({
      next: (data) => {
        this.dayOffs = data;
      },
      error: (err) => {
        console.error('Erro ao carregar folgas:', err);
        this.snackBar.open('Erro ao carregar folgas', 'Fechar', { duration: 3000 });
      },
    });
  }

  // Método para carregar os funcionários
  loadEmployees() {
    this.employeeService.list().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.snackBar.open('Erro ao carregar funcionários', 'Fechar', { duration: 3000 });
      },
    });
  }

  // Método para obter o nome do funcionário pelo ID
  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Funcionário não encontrado';
  }

  //Método para excluir uma folga
  deleteDayOff(id: number) {
    console.log('ID para exclusão:', id); // Verificando o ID
    if (confirm('Tem certeza que deseja excluir esta folga?')) {
      this.dayOffService.delete(id).subscribe({
        next: () => {
          this.loadDayOffs();
          this.snackBar.open('Folga excluída com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Erro ao excluir folga:', err);
          this.snackBar.open('Erro ao excluir folga', 'Fechar', { duration: 3000 });
        },
      });
    }
  }


 







  // Método para editar uma folga
  editDayOff(id: number) {
    console.log('Editando folga com ID:', id);
    this.router.navigate(['/dayoffs/edit', id]);
    this.snackBar.open('Editando folga...', 'Fechar', { duration: 3000 });
  }
}
