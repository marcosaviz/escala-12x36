import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsComponent } from './shifts.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: ShiftsComponent }, // Aqui você está carregando o ShiftsComponent para a rota '/shifts'
  { path: 'view', component: ViewComponent } // A rota para ViewComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }

