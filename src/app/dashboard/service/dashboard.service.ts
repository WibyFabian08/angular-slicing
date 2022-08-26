import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../interface/board';
import { Checklist } from '../interface/checklist';

const baseUrl = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBoards(owner: any): Observable<Board> {
    return this.http.get<Board>(`${baseUrl}/boards?owner=${owner}`)
  }

  createBoard(data: any): Observable<Board> {
    return this.http.post<Board>(`${baseUrl}/boards`, data)
  }

  updateBoard(data: any, id: any): Observable<Board> {
    return this.http.put<Board>(`${baseUrl}/boards/${id}`, data)
  }

  delete(id: any): Observable<Board> {
    return this.http.delete<Board>(`${baseUrl}/boards/${id}`)
  }

  getChecklist(id: any): Observable<Checklist> {
    return this.http.get<Checklist>(`${baseUrl}/checklist?boardId=${id}`)
  }

  addCheklist(data: any, id: any): Observable<Checklist> {
    return this.http.put<Checklist>(`${baseUrl}/checklist/${id}`, data)
  }

  updateChelist(data: any, id: any): Observable<Checklist> {
    return this.http.put<Checklist>(`${baseUrl}/checklist/${id}`, data)
  }

  deleteCheklist(data: any, id: any): Observable<Checklist> {
    return this.http.put<Checklist>(`${baseUrl}/checklist/${id}`, data)
  }

  updateChecklistItemPosition(id: any, data: any): Observable<Checklist> {
    return this.http.put<Checklist>(`${baseUrl}/checklist/${id}`, data)
  }

}
