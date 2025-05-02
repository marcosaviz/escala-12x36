  import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'new', component: FormComponent },
      { path: 'edit/:id', component: FormComponent }
    ]
  }
];




  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
