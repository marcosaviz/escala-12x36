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
  private readonly apiUrl = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) {}

  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(employee: CreateEmployeeDto): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  update(id: number, employee: UpdateEmployeeDto): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



