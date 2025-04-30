import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  //private readonly API = '/api/schedules';
  private readonly API = `${environment.apiUrl}/api/schedules`;
  constructor(private http: HttpClient) {}

  list(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API);
  }

  generate(month: number, year: number): Observable<void> {
    return this.http.post<void>(`${this.API}/generate`, { month, year });
  }
}