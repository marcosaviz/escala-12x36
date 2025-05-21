import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DayOff } from 'src/app/models/dayoff.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class DayOffService {
  private readonly apiUrl = `${environment.apiUrl}/api/dayoffs`;

  constructor(private http: HttpClient) {}


  list(): Observable<DayOff[]> {
    return this.http.get<DayOff[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  findById(id: number): Observable<DayOff> {
    return this.http.get<DayOff>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(dayOff: DayOff): Observable<DayOff> {
    return this.http.post<DayOff>(this.apiUrl, dayOff).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, dayOff: DayOff): Observable<DayOff> {
    return this.http.put<DayOff>(`${this.apiUrl}/${id}`, dayOff).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('Ocorreu um erro:' , error);
    return throwError(() => 'Erro ao se comunicar com o servidor. Tente novamente mais tarde.');
  }
}