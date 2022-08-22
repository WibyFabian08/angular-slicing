import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
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
}
