import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment['baseUrl'] + 'users/';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl + '/register', user, { headers: headerOptions });
  }

  authenticateUser(user) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl + '/authenticate', user, { headers: headerOptions });
  }

  getProfile() {
    return this.http.get<any>(this.baseUrl + '/profile');
  }

  getAllClubs() {
    return this.http.get<any>(this.baseUrl + '/clubs');
  }

  getUserById(userId) {
    return this.http.get<any>(this.baseUrl + 'userById/' + userId);
  }

}
