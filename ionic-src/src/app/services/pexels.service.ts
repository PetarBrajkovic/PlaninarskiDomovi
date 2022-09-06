import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient } from 'pexels';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {

  constructor(private http: HttpClient) { }

  getLodgePhotos(): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', '563492ad6f91700001000001bbb041f2689e47d9a7ebdce17fdf422c')
      .set('X-RapidAPI-Key', '1a98a4179emsh205750550345a22p1e6d49jsn46a3f1da8e2a')
      .set('X-RapidAPI-Host', 'PexelsdimasV1.p.rapidapi.com');
    return this.http.get<any>('https://pexelsdimasv1.p.rapidapi.com/v1/search?query=mountain%20house&locale=en-US&per_page=15&page=1',
      {
        headers: headerOptions
      });
  }

}
