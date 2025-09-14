// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  list() {
    throw new Error('Method not implemented.');
  }
  private base = 'http://localhost:8080/api/employees';

  // BehaviorSubject holds last known list; start with empty array
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    // initial load
    this.load().subscribe({ error: (err) => console.error('Initial load failed', err) });
  }

  // load from backend and update BehaviorSubject
  load(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.base).pipe(
      tap((list) => this.employeesSubject.next(list))
    );
  }

  // get one employee
  get(id: number) {
    return this.http.get<Employee>(`${this.base}/${id}`);
  }

  create(e: Employee) {
    return this.http.post<Employee>(this.base, e).pipe(
      // after create, refresh list from server
      tap(() => { this.load().subscribe({ error: (err) => console.error('Load after create failed', err) }); })
    );
  }

  update(id: number, e: Employee) {
    return this.http.put<Employee>(`${this.base}/${id}`, e).pipe(
      tap(() => { this.load().subscribe({ error: (err) => console.error('Load after update failed', err) }); })
    );
  }

  delete(id: number) {
    // we want to ensure delete returns response; once deleted refresh
    return this.http.delete<void>(`${this.base}/${id}`, { observe: 'response' }).pipe(
      tap(() => { this.load().subscribe({ error: (err) => console.error('Load after delete failed', err) }); })
    );
  }

  // optional: helper to search and update subject with results
  search(dept?: string, name?: string) {
    let params = new HttpParams();
    if (dept) params = params.set('dept', dept);
    if (name) params = params.set('name', name);

    return this.http.get<Employee[]>(`${this.base}/search`, { params }).pipe(
      tap((list) => this.employeesSubject.next(list))
    );
  }
}
