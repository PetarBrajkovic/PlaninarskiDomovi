import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation.mode';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  baseUrl = environment['baseUrl'] + 'reservation/';

  constructor(private http: HttpClient) { }

  createNewReservation(reservation: Reservation) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl + 'add', reservation, { headers: headerOptions });
  }

  getReservationByById(id) {
    return this.http.get<any>(this.baseUrl + 'getReservation/' + id);
  }

  getReservationByMountainLodgeById(id) {
    return this.http.get<any>(this.baseUrl + 'getReservationByLodge/' + id);
  }

  checkLodgeAvailability(lodgeId, startDate, endDate) {
    return this.http.get<any>(this.baseUrl + 'checkLodgeAvailability/' + lodgeId + `?startDate=${startDate}&endDate=${endDate}`);
  }

  updateReservation(id, reservation: Reservation) {
    return this.http.put<any>(this.baseUrl + 'updateReservation/' + id, { reservation: reservation });
  }

}
