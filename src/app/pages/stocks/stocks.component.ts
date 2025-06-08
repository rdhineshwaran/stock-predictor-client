import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule],
  providers: [StockService],
  template: `
    <h3>All Stocks</h3>
    <table *ngIf="stocks.length" class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Current</th>
          <th scope="col">History</th>
          <th scope="col">Prediction</th>
        </tr>
      </thead>
      <tbody>
      <tr *ngFor="let stock of stocks;let i = index; trackBy: trackBySymbol">
        <th scope="row">{{i + 1}}</th>
        <td>{{ stock.symbol }}</td>
        <td>
          <button [routerLink]="['/routePath']" routerLinkActive="router-link-active" >
            C
          </button>
        </td>
        <td>
          <button (click)="goToStock(stock.symbol)">
            H
          </button>
        </td>
        <td>
          <button (click)="goToPrediction(stock.symbol)">
            P
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  `
})
export class StocksComponent implements OnInit {
  stocks: string[] = [];
  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit() {
    this.stockService.getAllStocks().subscribe(data => this.stocks = data);
  }
  trackBySymbol(index: number, stock: any) {
    return stock.symbol;
  }
  goToStock(symbol: string) {
    this.router.navigate(['/stocks', symbol]);
  } 
  goToPrediction(symbol: string) {
    this.router.navigate(['/prediction', symbol]);
  } 
}