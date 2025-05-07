import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: '', component: ListComponent },         // Acessível via /employees/
      { path: 'new', component: FormComponent },     // Acessível via /employees/new
      { path: 'edit/:id', component: FormComponent } // Acessível via /employees/edit/:id
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
