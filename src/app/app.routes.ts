import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'stocks', loadComponent: () => import('./pages/stocks/stocks.component').then(m => m.StocksComponent) },
  { path: 'stocks/:id', loadComponent: () => import('./pages/stock-details/stock-details.component').then(m => m.StockDetailsComponent) },
  { path: 'prediction/:id', loadComponent: () => import('./pages/future-prediction/future-prediction.component').then(m => m.FuturePredictionComponent) }
];