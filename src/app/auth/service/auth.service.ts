import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/userInterface';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  register(data: any):Observable<User> {
    return this.http.post<User>(`${baseUrl}/users`, data)
  }
  
  login(email: any):Observable<User> {
    return this.http.get<User>(`${baseUrl}/users?email=${email}`)
  }

  checkEmail(email: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users?email=${email}`)
  }

  updatePassword(data: any, id: any): Observable<User> {
    return this.http.put<User>(`${baseUrl}/users/${id}`, data)
  }

  getToken(): string | null {
    return localStorage.getItem('user');
  }
}
