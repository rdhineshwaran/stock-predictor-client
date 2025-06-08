import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CommonModule],
  providers: [StockService],
  template: `
    <h3>Historical Data for {{ symbol }}</h3>
    <pre>{{ history | json }}</pre>
  `
})
export class StockDetailsComponent implements OnInit {
  symbol = '';
  history: any;
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      title: {
        display: true,
        text: 'Stock Price Trend'
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price'
        },
        ticks: {
          callback: function (value: any) {
            return '₹' + value;
          }
        }
      }
    }
  };

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('id') || '';
    if (this.symbol.includes(' ')) {
      const alias = this.getIndexAlias(this.symbol);
      this.stockService.getIndex(alias).subscribe(data => this.history = data);
    } else {
      this.stockService.getHistoricalData(this.symbol).subscribe(data => this.history = data);
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