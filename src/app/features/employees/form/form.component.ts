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
      if (idParam) {
        this.isEditMode = true;
        this.employeeId = +idParam;
        this.employeeService.findById(this.employeeId).subscribe(employee => {
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
      const formValues = { ...this.employeeForm.value };


      const formattedDate = this.formatDate(formValues.birthDate);
      if (!formattedDate) {
        alert('Data de nascimento inválida');
        return;
      }

      formValues.birthDate = formattedDate;

      const request = this.isEditMode
        ? this.employeeService.update(this.employeeId!, formValues)
        : this.employeeService.create(formValues);

      request.subscribe({
        next: () => this.router.navigate(['/employees/list']),
        error: (err) => {
          console.error('Erro ao enviar dados:', err);
          alert('Erro ao salvar os dados. Por favor, tente novamente.');
        }
      });
    }
  }

  goToList(): void {
    this.router.navigate(['/employees/list']);
  }

  cancel(): void {
    this.router.navigate(['/employees/list']);
  }
}
