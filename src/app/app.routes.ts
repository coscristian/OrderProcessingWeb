import { Routes } from '@angular/router';
import { OrdersListComponent } from './features/orders/orders-list.component';
import { OrderDetailComponent } from './features/orders/order-detail.component';
export const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: '**', redirectTo: '' },
];
