import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  //private readonly API = '/api/employees';
  private readonly API = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) {}

  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API}/${id}`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.API}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}



