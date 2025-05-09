import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DayOffService } from 'src/app/core/services/dayoff.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { DayOff } from 'src/app/models/dayoff.model';
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

interface Employee {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-dayoff-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
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
    MatProgressSpinnerModule
  ]
})
export class FormComponent implements OnInit {
  dayOffForm: FormGroup;
  dayOffId?: number;
  isEditMode: boolean = false;
  employees: Employee[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dayOffService: DayOffService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.dayOffForm = this.fb.group({
      employeeId: [null, Validators.required],
      date: [new Date(), [Validators.required]],
      reason: ['']
    });
  }

  ngOnInit() {
    // Captura o ID da rota
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this 
        this.dayOffId = +idParam;
        console.log('Editando folga com ID:', this.dayOffId); // Verifique se o ID está correto

        // Chamada para buscar os dados da folga pelo ID
        this.dayOffService.findById(this.dayOffId).subscribe({
          next: (dayOff) => {
            console.log('Folga encontrada:' , dayOff); //Verifica se os dados estão corretos
            if (dayOff) {
              console.log('Folga carregada para edição:' , dayOff);
              // Preenche o formulário com os valores da folga
              this.dayOffForm.patchValue({
                employeeId: dayOff.employee_id,
                date: new Date(dayOff.day),
                reason: dayOff.reason
                });
            }
        },
        error: (err) => {
          console.error('Erro ao buscar folga:', err);
          this.snackBar.open('Erro ao carregar folga', 'Fechar', { duration: 3000});
        }
      });
    }
  });
    // Carrega a lista de funcionários
  this.isLoading = true;
  this.employeeService.list().subscribe({
    next: (data) => {
      this.employees = data;
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
      this.snackBar.open('Erro ao carregar funcionários', 'Fechar', { duration: 3000 });
    }
  });
}

  private formatDate(date: any): string {
    if (date instanceof Date) {
      return date.toISOString();
    } else if (typeof date === 'string') {
      const formattedDate = new Date(date);
      return isNaN(formattedDate.getTime()) ? '' : formattedDate.toISOString();
    }
    return '';
  }

  onSubmit() {
    if (this.dayOffForm.valid) {
      const formValues = this.dayOffForm.value;
      const dayoffData: DayOff = {
        employee_id: formValues.employeeId,
        day: this.formatDate(formValues.date),
        reason: formValues.reason
      };


      //  // Escolhe entre criar ou atualizar com base no modo de edição
        const request = this.isEditMode
          ? this.dayOffService.update(this.dayOffId!, dayoffData) // Use o id diretamente do form
          : this.dayOffService.create(dayoffData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditMode ? 'Folga registrada com sucesso!' : 'Folga criada com sucesso!', 
            'Fechar',
            { duration: 3000 }
          );

          this.router.navigate(['/dayoffs']);
        },

        error: (err) => {
          console.error('Erro ao salvar folga:', err);
          this.snackBar.open('Erro ao salvar folga: ' + (err.error?.message || 'Erro desconhecido'), 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/dayoffs']);
  }

  filterValidDate = (date: Date | null): boolean => {
    const day = date?.getDay();
    const today = new Date();
    return day !== 0 && day !== 6 && date! > today;
  };
}
