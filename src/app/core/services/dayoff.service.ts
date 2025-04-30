import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayOff } from 'src/app/models/dayoff.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class DayOffService {
  //private readonly API = '/api/dayoffs';
  private readonly API = `${environment.apiUrl}/api/dayoffs`;
  constructor(private http: HttpClient) {}

  list(): Observable<DayOff[]> {
    return this.http.get<DayOff[]>(this.API);
  }

  findById(id: number): Observable<DayOff> {
    return this.http.get<DayOff>(`${this.API}/${id}`);
  }

  create(dayOff: DayOff): Observable<DayOff> {
    return this.http.post<DayOff>(this.API, dayOff);
  }

  update(id: number, dayOff: DayOff): Observable<DayOff> {
    return this.http.put<DayOff>(`${this.API}/${id}`, dayOff);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}