import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MountainLodge } from '../models/mountainLodge.model';

@Injectable({
  providedIn: 'root'
})
export class LodgeService {

  constructor(private http: HttpClient) { }

  getAllMountainLodges() {
    return this.http.get<any>('http://localhost:3000/lodge/getAll');
  }

  getMountainLodgeById(id) {
    return this.http.get<any>('http://localhost:3000/lodge/getLodge/' + id);
  }

  updateLodge(id, lodge: MountainLodge) {
    return this.http.put<any>('http://localhost:3000/lodge/updateLodge/' + id, { lodge: lodge });
  }

  addNewLodge(lodge: any) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/lodge/add', lodge, { headers: headerOptions });
  }

  getClubMountainLodges(id) {
    return this.http.get<any>('http://localhost:3000/lodge/getLodgesByClub/' + id);
  }
}
