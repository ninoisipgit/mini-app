import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Engineer } from '../models/engineer.model';

@Injectable({
  providedIn: 'root'
})
export class EngineerService {
  private apiUrl = 'http://127.0.0.1:8000/api/engineers'; // Adjust the URL as needed
  private apiUrlImage = 'http://127.0.0.1:8000/api/images';
  constructor(private http: HttpClient) { }

  // Get all engineers
  getAll(): Observable<Engineer[]> {
    return this.http.get<Engineer[]>(this.apiUrl);
  }

  // Get engineer by ID
  getById(id: number): Observable<Engineer> {
    return this.http.get<Engineer>(`${this.apiUrl}/${id}`);
  }

  create(engineer: Engineer): Observable<Engineer> {
    return this.http.post<Engineer>(this.apiUrl, engineer, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // create(data: Engineer) {
  //   return this.http
  //     .post<{ success: boolean; message: string; data: any }>(
  //       `${this.apiUrl}`,
  //       data
  //     )
  //     .pipe(map((response) => response));
  // }

  // Update an engineer
  update(id: number, engineer: Engineer): Observable<Engineer> {
    return this.http.put<Engineer>(`${this.apiUrl}/${id}`, engineer, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete an engineer
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(image: any, prcID: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('prcID', prcID.toString());

    const headers = new HttpHeaders({
      // Add any additional headers if needed
    });

    return this.http.post(`${this.apiUrlImage}/store`, formData, { headers });
  }

  getImageByPrcID(prcID: string): Observable<any> {
    return this.http.get(`${this.apiUrlImage}/${prcID}`);
  }
}
