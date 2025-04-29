import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API = '/api/employees';

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
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';


// @Injectable({ providedIn: 'root' })
// export class EmployeeService {
//   private apiUrl = 'http://localhost:3000/api/employees'; // ajustar conforme ambiente

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }

//   create(data: any): Observable<any> {
//     return this.http.post(this.apiUrl, data);
//   }

//   delete(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }



