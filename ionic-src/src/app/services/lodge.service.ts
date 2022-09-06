import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  updateLodge(id, pictureUrl) {
    return this.http.put<any>('http://localhost:3000/lodge/updateLodge/' + id, { pictureUrl: pictureUrl })
  }
}
