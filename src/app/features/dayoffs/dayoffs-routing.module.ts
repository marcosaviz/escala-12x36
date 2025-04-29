import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DayoffsComponent } from './dayoffs.component';



const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'new', component: FormComponent },
  { path: 'edit/:id', component: FormComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayoffsRoutingModule { }
