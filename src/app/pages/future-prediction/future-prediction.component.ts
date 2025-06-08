import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-future-prediction',
  standalone: true,
  imports: [CommonModule],
  providers: [StockService],
  template: `
    <h3>Future Prediction for {{ symbol }}</h3>
    <pre>{{ prediction | json }}</pre>
  `
})
export class FuturePredictionComponent implements OnInit {
  symbol = '';
  prediction: any;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('id') || '';
    if (this.symbol.includes(' ')) {
      const alias = this.getIndexAlias(this.symbol);
      this.stockService.getIndex(alias).subscribe(data => this.prediction = data);
    } else {
      this.stockService.getFuturePrediction(this.symbol).subscribe(data => this.prediction = data);
    }
  }

  getIndexAlias(symbol: string): string {
    const map: { [key: string]: string } = {
      "NIFTY 50.NS": "nifty50",
      "NIFTY BANK.NS": "nifty_bank",
      "SENSEX.BSE": "sensex"
    };
    return map[symbol] || symbol;
  }
  
}