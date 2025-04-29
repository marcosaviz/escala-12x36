import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Certifique-se de que o AppRoutingModule esteja importado também
import {EmployeesModule} from 'src/app/features/employees/employees.module'
import { FullCalendarModule } from '@fullcalendar/angular';
  





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // 👈 precisa para Angular Material funcionar
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    EmployeesModule, // Adicione EmployeesModule aqui
    FullCalendarModule // Adicione FullCalendarModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }