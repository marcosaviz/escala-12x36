import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  
  private readonly API = `${environment.apiUrl}/api/shifts`;

  constructor(private http: HttpClient) {}
  

  // Método para obter todos os turnos
  list(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API).pipe(
      catchError((error)=> {
        console.log('Erro ao obter os turnos', error);
        return throwError(() => error);
      })
    )
  }
  // Método para adicionar um turno (se necessário)
  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.API, schedule).pipe(
      catchError((error)=>  {
        console.log('Erro ao adicionar turno', error);
        return throwError(() => error);
      })
    )
  }

  // Método para atualizar um turno
  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.API}/${schedule.id}`, schedule).pipe(
      catchError((error)=> {
        console.log('Erro ao atualizar turno', error);
        return throwError(() => error);
      })
    )
  }

  // Método para excluir um turno
  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(
      catchError((error)=> {
        console.log('Erro ao excluir turno', error);
        return throwError(() => error);
      })
    )
  }
  
   // Método para gerar turnos em uma faixa de datas
  generate(start_date: string, end_date: string): Observable<void> {
    return this.http.post<void>(`${this.API}/generate`, { start_date, end_date }).pipe(
      catchError((error)=> {
        console.log('Erro ao gerar os turnos', error);
        return throwError(() => error);
      })
    );
  }

  // Método para apagar toda a escala
  deleteAllSchedules(): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete`).pipe(
      catchError((error) => {
        console.log('Erro ao apagar a escala', error);
        return throwError(() => error);
      })
    );
  }
  
}