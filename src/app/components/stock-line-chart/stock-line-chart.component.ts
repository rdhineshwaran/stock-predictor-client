import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-stock-line-chart',
  standalone: true,
  templateUrl: './stock-line-chart.component.html',
  styleUrls: ['./stock-line-chart.component.css'],
  imports: [CommonModule, NgChartsModule],
})
export class StockLineChartComponent {
  @Input() chartData: any;
  @Input() chartOptions: any;
}