import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table'; // Importar aqui!
import { ListComponent } from './features/employees/list/list.component'; // Exemplo, ajuste o caminho


const routes: Routes = [
  { path: 'employees', loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'vacations', loadChildren: () => import('./features/vacations/vacations.module').then(m => m.VacationsModule) },
  { path: 'dayoffs', loadChildren: () => import('./features/dayoffs/dayoffs.module').then(m => m.DayoffsModule) },
  { path: 'shifts', loadChildren: () => import('./features/shifts/shifts.module').then(m => m.ShiftsModule) },
  { path: 'schedules', loadChildren: () => import('./features/schedules/schedules.module').then(m => m.SchedulesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
