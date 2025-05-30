import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacationsComponent } from './vacations.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { 
    path: '', component: VacationsComponent, children: [
      { path: '', component: ListComponent }, // Lista de vacation
      { path: 'new', component: FormComponent }, // Formulario para nova vacation
      { path: 'id/:id', component: FormComponent } // Formulario para editar vacation
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule {}
