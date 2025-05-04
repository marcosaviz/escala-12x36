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
      { path: '', component: ListComponent }, // Listar funcionários
      { path: 'new', component: FormComponent }, // Criar novo funcionário
      { path: 'edit/:id', component: FormComponent } // Editar funcionário existente
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
