import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MountainLodge } from '../models/mountainLodge.model';

@Injectable({
  providedIn: 'root'
})
export class LodgeService {

  baseUrl = environment['baseUrl'] + 'lodge/';

  constructor(private http: HttpClient) { }

  getAllMountainLodges() {
    return this.http.get<any>(this.baseUrl + 'getAll');
  }

  getMountainLodgeById(id) {
    return this.http.get<any>(this.baseUrl + 'getLodge/' + id);
  }

  updateLodge(id, lodge: MountainLodge) {
    return this.http.put<any>(this.baseUrl + 'updateLodge/' + id, { lodge: lodge });
  }

  addNewLodge(lodge: any) {
    const headerOptions = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl + 'add', lodge, { headers: headerOptions });
  }

  getClubMountainLodges(id) {
    return this.http.get<any>(this.baseUrl + 'getLodgesByClub/' + id);
  }
}
