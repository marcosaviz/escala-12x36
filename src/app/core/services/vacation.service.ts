import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacation } from 'src/app/models/vacation.model';


    
@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private readonly API = '/api/vacations';

  constructor(private http: HttpClient) {}

  list(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.API);
  }

  findById(id: number): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.API}/${id}`);
  }

  create(vacation: Vacation): Observable<Vacation> {
    return this.http.post<Vacation>(this.API, vacation);
  }

  update(id: number, vacation: Vacation): Observable<Vacation> {
    return this.http.put<Vacation>(`${this.API}/${id}`, vacation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}