import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeesModule } from 'src/app/features/employees/employees.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import necessário para Toastr

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Necessário para animações do Angular Material
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FullCalendarModule, // FullCalendar
    HttpClientModule,   // Para requisições HTTP
    MatSnackBarModule,  // Para suporte ao Toastr com Angular Material
    ToastrModule.forRoot({ // Configurações do Toastr
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    EmployeesModule, // Certifique-se de que este módulo está corretamente configurado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
