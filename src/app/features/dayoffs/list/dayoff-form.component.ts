import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { DayOffService } from 'src/app/core/services/dayoff.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  standalone: true,
  selector: 'app-dayoff-form',
  templateUrl: './form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class FormComponent implements OnInit {
  dayOffForm!: FormGroup;
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dayOffService: DayOffService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dayOffForm = this.fb.group({
      employeeId: [null, Validators.required],
      date: [null, Validators.required],
      reason: ['']
    });

    this.employeeService.list().subscribe(data => {
      this.employees = data;
    });
  }

  onSubmit(): void {
    if (this.dayOffForm.valid) {
      this.dayOffService.create(this.dayOffForm.value).subscribe(() => {
        this.router.navigate(['/dayoffs']);
      });
    }
  }
}
