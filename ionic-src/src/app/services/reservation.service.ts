import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.mode';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  createNewReservation(reservation: Reservation) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/reservation/add', reservation, { headers: headerOptions });
  }

  getAllMountainLodges() {
    return this.http.get<any>('http://localhost:3000/lodge/getAll');
  }

  getMountainLodgeById(id) {
    return this.http.get<any>('http://localhost:3000/lodge/getLodge/' + id);
  }

}
