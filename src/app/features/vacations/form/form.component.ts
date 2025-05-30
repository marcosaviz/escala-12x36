import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VacationService } from 'src/app/core/services/vacation.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Vacation } from 'src/app/models/vacation.model';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Formato de data desejado
export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

interface Employee {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Padrão brasileiro
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Formato personalizado
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})

export class FormComponent implements OnInit {
  vacationForm: FormGroup;
  vacationId?: number;
  isEditMode = false;
  employees: Employee[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private vacation: VacationService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.vacationForm = this.fb.group({
      employeeId: [null, Validators.required],
      date: [new Date(), Validators.required],
      reason: [''],
    });
  }

  ngOnInit() {
    this.loadDayOff();
    this.loadEmployees();
  }

  private loadDayOff() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.vacationId = +idParam;

        this.VacationService.findById(this.vacationId).subscribe({
          next: (vacation) => {
            if (vacation) {
              const formattedDate = new Date(vacation.day);
              this.vacationForm.patchValue({
                employeeId: vacation.employee_id,
                date: formattedDate,
                reason: vacation.reason,
              });
            }
          },
          error: (err) => {
            console.error('Erro ao buscar folga:', err);
            this.showErrorMessage('Erro ao carregar folga');
          },
        });
      }
    });
  }

  private loadEmployees() {
    this.isLoading = true;
    this.employeeService.list().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showErrorMessage('Erro ao carregar funcionários');
      },
    });
  }

  private formatDate(date: any): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]; // Formato: yyyy-MM-dd
    } else if (typeof date === 'string') {
      const formattedDate = new Date(date);
      return isNaN(formattedDate.getTime()) ? '' : formattedDate.toISOString().split('T')[0];
    }
    return '';
  }


  onSubmit() {
    if (this.vacationForm.valid) {
      const formValues = this.vacationForm.value;
      const vacationData: Vacation = {
        employee_id: formValues.employeeId,
        day: this.formatDate(formValues.date),
        reason: formValues.reason,
      };

      const request = this.isEditMode
        ? this.vacationService.update(this.vacationId!, vacationData)
        : this.vacationService.create(vacationData);

      request.subscribe({
        next: () => {
          this.showSuccessMessage(
            this.isEditMode ? 'Folga registrada com sucesso!' : 'Folga criada com sucesso!'
          );
          this.router.navigate(['/dayoffs']);
        },
        error: (err) => {
          console.error('Erro ao salvar folga:', err);
          this.showErrorMessage(
            'Erro ao salvar folga: ' + (err.error?.message || 'Erro desconhecido')
          );
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/dayoffs']);
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }

  filterValidDate = (date: Date | null): boolean => {
    const day = date?.getDay();
    const today = new Date();
    return day !== 0 && day !== 6 && date! > today;
  };
}
