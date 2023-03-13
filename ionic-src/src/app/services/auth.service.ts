import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/register', user, { headers: headerOptions });
  }

  authenticateUser(user) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, { headers: headerOptions });
  }

  getProfile() {
    return this.http.get<any>('http://localhost:3000/users/profile');
  }

  getAllClubs() {
    return this.http.get<any>('http://localhost:3000/users/clubs');
  }

}
