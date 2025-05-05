import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  //private readonly API = '/api/shifts';
  private readonly API = `${environment.apiUrl}/api/shifts`;
  constructor(private http: HttpClient) {}

  list(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API);
  }

  generate(start_date: string, end_date: string): Observable<void> {
    return this.http.post<void>(`${this.API}/generate`, { start_date, end_date });
  }
}