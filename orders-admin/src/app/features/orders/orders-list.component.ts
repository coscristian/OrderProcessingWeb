import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  loading = false;
  error = '';

  page = 1;
  pageSize = 10;
  totalPages = 1;

  fromControl = new FormControl('');
  toControl = new FormControl('');

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = '';

    const from = this.fromControl.value || undefined;
    const to = this.toControl.value || undefined;

    this.orderService
      .list(this.page, this.pageSize, undefined, from, to)
      .subscribe({
        next: (data) => {
          this.orders = data.items;
          this.totalPages = data.totalPages;
          this.loading = false;
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  apply(): void {
    this.page = 1;
    this.loadOrders();
  }

  clear(): void {
    this.fromControl.setValue('');
    this.toControl.setValue('');

    this.page = 1;
    this.loadOrders();
  }

  prev(): void {
    if (this.page > 1) {
      this.page--;
      this.loadOrders();
    }
  }

  next(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadOrders();
    }
  }

  view(id: number): void {
    this.router.navigate(['/orders', id]);
  }

  formatMoney(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  handleError(error: any): void {
    this.loading = false;

    if (error?.status === 400) {
      this.error = 'Please check the submitted information.';
    } else if (error?.status === 404) {
      this.error = 'The requested resource was not found.';
    } else if (error?.status === 409) {
      this.error = 'Insufficient stock or conflicting operation.';
    } else {
      this.error = 'Something went wrong. Please try again.';
    }
  }
}
