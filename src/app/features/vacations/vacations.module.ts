import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VacationsRoutingModule } from './vacations-routing.module';
import { VacationsComponent } from './vacations.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    VacationsComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    VacationsRoutingModule
  ]
})
export class VacationsModule { }
