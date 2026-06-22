

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerInterface } from '../interface/SellerInterface';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiUrl = 'http://localhost:8080/sellers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SellerInterface[]> {
    return this.http.get<SellerInterface[]>(this.apiUrl);
  }
}

