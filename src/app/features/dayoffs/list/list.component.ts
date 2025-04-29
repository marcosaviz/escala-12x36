import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatTableModule } from '@angular/material/table'; // Importar aqui!
import { RouterModule } from '@angular/router';  // Adicione esta linha
import { CommonModule } from '@angular/common';  // Importando CommonModule

import { DayOffService } from 'src/app/core/services/dayoff.service';
import { DayOff } from 'src/app/models/dayoff.model';




@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  imports: [MatTableModule, RouterModule, CommonModule], // Adicionando RouterModule aqui
})



export class ListComponent implements OnInit {
  dayOffs: DayOff[] = [];
  
  constructor(private dayOffService: DayOffService) {}
  
  ngOnInit(): void {
    this.loadDayOffs();
  }
  
  loadDayOffs() {
    this.dayOffService.list().subscribe(data => {
      this.dayOffs = data;
    });
  }
  
  deleteDayOff(id: number) {
    this.dayOffService.delete(id).subscribe(() => {
      this.loadDayOffs();
    });
  }
}





// export class ListComponent implements OnInit {
//   employees: any[] = [];

//   displayedColumns: string[] = ['name', 'position'];  // Adicione as colunas desejadas

//   constructor(private employeeService: EmployeeService) {}

//   ngOnInit(): void {
//     this.loadEmployees();
//   }

//   loadEmployees() {
//     this.employeeService.list().subscribe(data => {
//       this.employees = data;
//     });
//   }

//   deleteEmployee(id: number) {
//     this.employeeService.delete(id).subscribe(() => {
//       this.loadEmployees();
//     });
//   }
// }
