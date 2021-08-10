import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementModel } from '../models/advertisementModel';
import { SearchAdvertisementsModel } from '../models/searchAdvertisementsModel';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): any {
    let userId = window.localStorage.getItem('userId');

    if (!userId) {
      userId = uuidv4();
      window.localStorage.setItem('userId', userId);
    }

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('userId', userId);

    return headers;
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`)
  }

  getAdvertisements(search: SearchAdvertisementsModel): Observable<AdvertisementModel[]> {
    let params = new HttpParams();

    //if (!!search.isOwn) params = params.append('isOwn', search.isOwn);
    if (!!search.category) params = params.append('category', search.category);
    if (!!search.search) params = params.append('search', search.search);
    //if (!!search.updatedOn) params = params.append('updatedOn', search.updatedOn.toDateString());

    let options = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<AdvertisementModel[]>(
      `${this.baseUrl}/advertisements`,
      options)
  }

  getAdvertisement(id: number): Observable<AdvertisementModel> {
    return this.http.get<AdvertisementModel>(`${this.baseUrl}/advertisement/${id}`)
  }

  addAdvertisement(advertisement: AdvertisementModel): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/advertisements`,
      advertisement,
      { headers: this.getHeaders() });
  }

  updateAdvertisement(advertisement: AdvertisementModel): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/advertisements`,
      advertisement,
      { headers: this.getHeaders() });
  }

  deleteAdvertisement(advertisement: AdvertisementModel): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/advertisements/${advertisement.id}`,
      { headers: this.getHeaders() });
  }
}
