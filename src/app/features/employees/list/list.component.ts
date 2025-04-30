
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service'; // ajuste o caminho se necessário
import { Employee } from 'src/app/models/employee.model'; // ajuste o caminho se necessário
import { RouterModule } from '@angular/router'; // Certifique-se de importar o RouterModule!
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,      // <== IMPORTANTE!
    MatButtonModule,
    RouterModule

  ]
})
export class ListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'position', 'actions'];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.list().subscribe(data => {
      this.employees = data;
    });
  }

  delete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.employeeService.delete(id).subscribe(() => {
        this.loadEmployees(); // Recarrega a lista após exclusão
      });
    }
  }
}