import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacationsComponent } from './vacations.component';

const routes: Routes = [
  { 
    path: '', component: VacationsComponent, children: [
      { 
        path: '', 
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent) 
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule {}
