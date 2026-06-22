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

  // GET
  getAll(): Observable<SellerInterface[]> {
    return this.http.get<SellerInterface[]>(this.apiUrl);
  }

 
  getById(id: number): Observable<SellerInterface> {
    return this.http.get<SellerInterface>(`${this.apiUrl}/${id}`);
  }

  // POST
  create(seller: SellerInterface): Observable<SellerInterface> {
    return this.http.post<SellerInterface>(this.apiUrl, seller);
  }

  // PUT
  update(id: number, seller: SellerInterface): Observable<SellerInterface> {
    return this.http.put<SellerInterface>(
      `${this.apiUrl}/${id}`,
      seller
    );
  }

  delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}