import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Order,
  PaginatedOrders,
  CreateOrderRequest,
} from '../models/order';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  get(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.base}/${id}`);
  }

  list(
    page = 1,
    pageSize = 10,
    customerId?: number,
    from?: string,
    to?: string,
  ): Observable<PaginatedOrders> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));

    if (customerId) {
      params = params.set('customerId', String(customerId));
    }

    if (from) {
      params = params.set('from', from);
    }

    if (to) {
      params = params.set('to', to);
    }

    return this.http.get<PaginatedOrders>(this.base, { params });
  }

  create(payload: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.base, payload);
  }
}