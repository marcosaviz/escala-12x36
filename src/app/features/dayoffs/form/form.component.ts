import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DayOffService } from 'src/app/core/services/dayoff.service';
import { RouterModule } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-dayoff-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'], // Certifique-se que o caminho está correto
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule // <-- Adicione isso aqui!
  ]
})


export class FormComponent implements OnInit {
  dayOffForm: FormGroup;
  dayOffId?: number;

  constructor(
    private fb: FormBuilder,
    private dayOffService: DayOffService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dayOffForm = this.fb.group({
      employeeId: [null, Validators.required],
      date: ['', Validators.required],
      reason: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.dayOffId = +idParam;
        this.dayOffService.findById(this.dayOffId).subscribe(dayOff => {
          this.dayOffForm.patchValue(dayOff);
        });
      }
    });
  }

  onSubmit() {
    if (this.dayOffForm.valid) {
      if (this.dayOffId) {
        this.dayOffService.update(this.dayOffId, this.dayOffForm.value).subscribe(() => {
          this.router.navigate(['/dayoffs']);
        });
      } else {
        this.dayOffService.create(this.dayOffForm.value).subscribe(() => {
          this.router.navigate(['/dayoffs']);
        });
      }
    }
  }
}



















// import { Component, OnInit } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { ActivatedRoute, Router } from '@angular/router';
// import { EmployeeService } from 'src/app/core/services/employee.service';
// import { DayOffService } from 'src/app/core/services/dayoff.service';

// @Component({
//   standalone: true,
//   selector: 'app-employee-form',
//   templateUrl: './form.component.html',
//   imports: [
//     ReactiveFormsModule,   // <-- aqui! para funcionar o formGroup
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ],
// })



// @Component({
//   selector: 'app-employee-form',
//   templateUrl: './form.component.html'
// })


// export class FormComponent implements OnInit {
//   employeeForm: FormGroup;
//   employeeId?: number;
  
//   constructor(
//     private fb: FormBuilder,
//     private employeeService: EmployeeService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     this.employeeForm = this.fb.group({
//       name: ['', Validators.required],
//       position: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['']
//     });
//   }
  
//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       const idParam = params.get('id');
//       if (idParam) {
//         this.employeeId = +idParam;
//         this.employeeService.findById(this.employeeId).subscribe(employee => {
//           this.employeeForm.patchValue(employee);
//         });
//       }
//     });
//   }
  
//   onSubmit() {
//     if (this.employeeForm.valid) {
//       if (this.employeeId) {
//         this.employeeService.update(this.employeeId, this.employeeForm.value).subscribe(() => {
//           this.router.navigate(['/employees']);
//         });
//       } else {
//         this.employeeService.create(this.employeeForm.value).subscribe(() => {
//           this.router.navigate(['/employees']);
//         });
//       }
//     }
//   }
// }

// export class FormComponent {
//   employeeForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.employeeForm = this.fb.group({
//       name: ['', Validators.required],
//       position: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['']
//     });
//   }

//   onSubmit() {
//     if (this.employeeForm.valid) {
//       console.log('Form Submitted:', this.employeeForm.value);
//       // Aqui você pode chamar seu serviço para salvar no backend
//     }
//   }
// }