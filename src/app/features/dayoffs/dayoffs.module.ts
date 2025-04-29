
import { DayoffsRoutingModule } from './dayoffs-routing.module';
import { DayoffsComponent } from './dayoffs.component';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './list/list.component'; // Ajuste o caminho certinho
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    DayoffsComponent,
  ],
  imports: [
    CommonModule,
    DayoffsRoutingModule,
    CommonModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class DayoffsModule { }
