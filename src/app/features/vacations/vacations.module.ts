import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationsRoutingModule } from './vacations-routing.module';
import { VacationsComponent } from './vacations.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    VacationsComponent,

  ],
  imports: [
    CommonModule,
    VacationsRoutingModule,
    FormComponent
  ]
})
export class VacationsModule { }
