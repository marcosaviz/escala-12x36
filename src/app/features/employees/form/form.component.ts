import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';


@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class FormComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId?: number;
  isEditMode: boolean = false;


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log('ID do funcionário:', idParam); // Adicione este log
      if (idParam) {
        this.isEditMode = true;
        this.employeeId = +idParam;
        this.employeeService.findById(this.employeeId).subscribe(employee => {
          if (employee) {
            this.employeeForm.patchValue(employee);
          } else {
            alert('Funcionário não encontrado.');
            this.router.navigate(['/employee']);
          }
          console.log('Dados recebidos para edição:', employee); // Verificação
          this.employeeForm.patchValue(employee);
        });
      }
    });
  }

  private formatDate(date: string): string | null {
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime()) ? null : formattedDate.toISOString();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValues = this.employeeForm.value;
      console.log('Dados enviados:',)
      const formattedDate = this.formatDate(formValues.birthDate);
  
      if (!formattedDate) {
        alert('Data de nascimento inválida');
        return;
      }
  
      const payload = {
        name: formValues.name,
        birth_date: formattedDate,
        email: formValues.email,
        phone: formValues.phone
      };
  
      const request = this.isEditMode
        ? this.employeeService.update(this.employeeId!, payload)
        : this.employeeService.create(payload);
  
      request.subscribe({
        next: () => this.router.navigate(['/employees']), // ✅ rota corrigida
        error: (err) => {
          console.error('Erro ao salvar os dados:', err);
          alert('Erro ao salvar os dados. Por favor, tente novamente.');
        }
      });
    }
  }
  goToList(): void {
    this.router.navigate(['/employees/']);
  }

  cancel(): void {
    this.goToList();
  }
};

  