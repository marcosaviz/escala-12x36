import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacation } from 'src/app/models/vacation.model';
import { environment } from 'src/environments/environment';



    
@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private readonly apiUrl = `${environment.apiUrl}/api/vacations`;
  constructor(private http: HttpClient) {}

  list(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.apiUrl);
  }

  findById(id: number): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.apiUrl}/${id}`);
  }

  create(vacation: Vacation): Observable<Vacation> {
    return this.http.post<Vacation>(this.apiUrl, vacation);
  }

  update(id: number, vacation: Vacation): Observable<Vacation> {
    return this.http.put<Vacation>(`${this.apiUrl}/${id}`, vacation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}