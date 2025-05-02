import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';  // Certifique-se de importar RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    EmployeesComponent,
    
  ],
  imports: [
  CommonModule,
  EmployeesRoutingModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  RouterModule,
  MatTableModule
  ]
})
export class EmployeesModule { }


