import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { VacationService } from 'src/app/core/services/vacation.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Vacation } from 'src/app/models/vacation.model';
import { Employee } from 'src/app/models/employee.model';




@Component({
  selector: 'app-vacation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None, // Desativa a encapsulação para garantir os estilos
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule ]
})


export class ListComponent implements OnInit {
  vacations: Vacation[] = [];
  employees: Employee[] = [];
  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate', 'actions'];

  constructor(
    private vacationService: VacationService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadVacations();
    this.loadEmployees();
  }

  // Carrega a lista de férias
  private loadVacations(): void {
    this.vacationService.list().subscribe((data) => {
      this.vacations = data;
    });
  }

  // Carrega a lista de funcionários para obter os nomes
  private loadEmployees(): void {
    this.employeeService.list().subscribe((data) => {
      this.employees = data;
    });
  }


   // Obtém o nome do funcionário pelo ID
  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Desconhecido';
  }

  // Exclui uma férias pelo ID
  deleteVacation(id: number): void {
    if (confirm('Tem certeza que deseja excluir estas ferias?')) {
      this.vacationService.delete(id).subscribe(()=> {
        this.vacations = this.vacations.filter(vacation => vacation.id !== id);
      });
    }
  }
}
