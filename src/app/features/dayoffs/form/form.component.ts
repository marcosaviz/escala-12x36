import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DayOffService } from 'src/app/core/services/dayoff.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatNativeDateModule
  ]
})
export class FormComponent implements OnInit {
  dayOffForm: FormGroup;
  dayOffId?: number;
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dayOffService: DayOffService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dayOffForm = this.fb.group({
      employeeId: [null, Validators.required],
      date: [null, Validators.required],
      reason: ['']
    });
  }

  ngOnInit() {
    // Carregar dados se for edição
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.dayOffId = +idParam;
        this.dayOffService.findById(this.dayOffId).subscribe(dayOff => {
          this.dayOffForm.patchValue(dayOff);
        });
      }
    });

    // Carregar lista de funcionários
    this.employeeService.list().subscribe(data => {
      this.employees = data;
    });
  }

  onSubmit() {
    if (this.dayOffForm.valid) {
      const formValue = this.dayOffForm.value;
      const request = this.dayOffId
        ? this.dayOffService.update(this.dayOffId, formValue)
        : this.dayOffService.create(formValue);

      request.subscribe(() => this.router.navigate(['/dayoffs']));
    }
  }

  // Filtro de datas para desabilitar finais de semana
  filterValidDate = (date: Date | null): boolean => {
    const day = date?.getDay();
    return day !== 0 && day !== 6; // 0 = domingo, 6 = sábado
  };
}
