import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  pipe(arg0: OperatorFunction<Project[], Project[]>) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api/projects'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  // Get all projects
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Get project by ID
  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Create a new project
  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Update a project
  update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete a project
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
