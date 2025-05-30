import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DayoffsComponent } from './dayoffs.component';



const routes: Routes = [
  {
    path: '', component: DayoffsComponent, children: [
      { path: '', component: ListComponent }, // Lista de folgas
      { path: 'new', component: FormComponent }, // Formulário para nova folga
      { path: 'edit/:id', component: FormComponent } // Formulário para editar uma folga
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayoffsRoutingModule { }
