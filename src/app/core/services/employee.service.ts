import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model'
import { environment } from 'src/environments/environment';
import { CreateEmployeeDto } from 'src/app/models/create-employee.dto';  // Importando o DTO
import { UpdateEmployeeDto } from 'src/app/models/update-employee.dto';

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  private readonly API = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) {}

  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API}/${id}`);
  }

  create(employee: CreateEmployeeDto): Observable<Employee> {
    return this.http.post<Employee>(this.API, employee);
  }

  update(id: number, employee: UpdateEmployeeDto): Observable<Employee> {
    return this.http.put<Employee>(`${this.API}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}



