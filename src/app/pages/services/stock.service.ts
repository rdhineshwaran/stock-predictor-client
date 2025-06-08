import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/stocks`);
  }

  getCurrentPrice(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stocks/${symbol}/current`);
  }

  getHistoricalData(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stocks/${symbol}/history`);
  }

  getFuturePrediction(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stocks/${symbol}/predict`);
  }

  getAllStocks(exchange: string = 'NSE'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stocks?exchange=${exchange}`);
  }

  getIndex(symbol: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/index-history?index=${symbol}`);
  }
  
}