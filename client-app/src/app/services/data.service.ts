import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementModel } from '../models/advertisementModel';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private getHttpOption(): any {
    let userId = window.localStorage.getItem('userId');

    if (!userId) {
      userId = uuidv4();
      window.localStorage.setItem('userId', userId);
    }

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('userId', userId);

    return { headers };
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`)
  }

  getAdvertisements(): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(`${this.baseUrl}/advertisements`)
  }

  addAdvertisements(advertisement: AdvertisementModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/advertisements`, advertisement, this.getHttpOption());
  }

  updateAdvertisements(advertisement: AdvertisementModel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/advertisements`, advertisement, this.getHttpOption());
  }

  deleteAdvertisements(advertisement: AdvertisementModel): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/advertisements/${advertisement.id}`, this.getHttpOption());
  }
}
